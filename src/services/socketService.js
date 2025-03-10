const socketIo = require('socket.io');
const { getDB } = require('../config/firebase');
const formatFirebaseTimestamp = require("../utils/formatFirebaseTimestamp");

/**
 * SocketService - Manages WebSocket connections and event broadcasting
 * 
 * This service:
 * 1. Sets up the Socket.IO server
 * 2. Manages client connections
 * 3. Listens to Firestore events collection for changes
 * 4. Broadcasts events to connected clients
 */
class SocketService {
  constructor() {
    this.io = null;
    this.db = getDB();
    this.eventsUnsubscribe = null;
    this.connectedClients = 0;
  }

  /**
   * Initialize the Socket.IO server with an HTTP server instance
   * @param {Object} httpServer - The HTTP server to attach Socket.IO to
   */
  initialize(httpServer) {
    console.log('[SocketService] Initializing Socket.IO server...');
    
    // Create Socket.IO server with CORS settings matching Express
    this.io = socketIo(httpServer, {
      cors: {
        origin: '*', // Should match your frontend origin in production
        methods: ['GET', 'POST'],
        credentials: true
      }
    });

    // Set up connection handler
    this.io.on('connection', this.handleConnection.bind(this));
    
    // Set up Firestore listener
    this.setupFirestoreListener();
    
    console.log('[SocketService] Socket.IO server initialized');
    return this.io;
  }

  /**
   * Handle new client connections
   * @param {Object} socket - Socket.IO socket object
   */
  handleConnection(socket) {
    this.connectedClients++;
    console.log(`[SocketService] New client connected (id: ${socket.id}). Total clients: ${this.connectedClients}`);
    
    // Send connection confirmation to client
    socket.emit('connection_status', { 
      connected: true, 
      message: 'Connected to HomePal WebSocket server' 
    });

    // Handle mock event creation from frontend
    socket.on('create-mock-event', this.handleCreateMockEvent.bind(this));

    // Handle disconnection
    socket.on('disconnect', () => {
      this.connectedClients--;
      console.log(`[SocketService] Client disconnected (id: ${socket.id}). Total clients: ${this.connectedClients}`);
    });
  }

  /**
   * Handle mock event creation request from frontend
   * @param {Object} eventData - Event data to create
   */
  async handleCreateMockEvent(eventData) {
    try {
      console.log('[SocketService] Received mock event creation request:', eventData);
      
      // Add server timestamp if not provided
      if (!eventData.time) {
        eventData.time = new Date();
      }
      
      // Generate a unique ID if not provided
      if (!eventData.eventId) {
        eventData.eventId = `MOCK-${eventData.deviceId || 'DEV'}-${Date.now()}`;
      }
      
      // Add to Firestore (which will trigger the listener and broadcast)
      await this.db.collection('events').doc(eventData.eventId).set(eventData);
      
      console.log('[SocketService] Mock event created successfully:', eventData.eventId);
    } catch (error) {
      console.error('[SocketService] Error creating mock event:', error);
    }
  }

  /**
   * Set up a listener for new events in Firestore
   */
  setupFirestoreListener() {
    console.log('[SocketService] Setting up Firestore events listener...');
    
    try {
      // Create a query for the events collection, ordered by time descending
      const eventsQuery = this.db.collection('events')
        .orderBy('time', 'desc')
        .limit(20);
      
      // Set up the listener
      this.eventsUnsubscribe = eventsQuery.onSnapshot(
        snapshot => {
          // Process document changes (added, modified, removed)
          snapshot.docChanges().forEach(change => {
            // We're only interested in newly added events
            if (change.type === 'added') {
              this.handleNewEvent(change.doc);
            }
          });
        },
        error => {
          console.error('[SocketService] Error in Firestore listener:', error);
        }
      );
      
      console.log('[SocketService] Firestore events listener set up successfully');
    } catch (error) {
      console.error('[SocketService] Failed to set up Firestore listener:', error);
    }
  }

  /**
   * Handle a new event from Firestore and broadcast to clients
   * @param {Object} doc - Firestore document snapshot
   */
  handleNewEvent(doc) {
    try {
      // Extract event data
      const eventData = doc.data();
      const eventId = doc.id;
      
      // Check if this is actually a new event (not just initial load)
      const eventTime = eventData.time?.toDate ? eventData.time.toDate() : new Date(eventData.time);
      const currentTime = new Date();
      const timeDiffInSeconds = (currentTime - eventTime) / 1000;
      
      // Only trigger for events that are less than 60 seconds old
      if (timeDiffInSeconds < 60) {
        console.log('[SocketService] New event detected:', eventId);
        
        // Format the event data for broadcast
        const formattedEvent = {
          id: eventId,
          ...eventData,
          time: eventData.time ? formatFirebaseTimestamp(eventData.time) : new Date().toISOString()
        };
        
        // Broadcast to all connected clients
        if (this.io) {
          this.io.emit('event', formattedEvent);
          console.log('[SocketService] Event broadcast to all clients:', eventId);
        } else {
          console.warn('[SocketService] Socket.IO not initialized, could not broadcast event');
        }
      }
    } catch (error) {
      console.error('[SocketService] Error handling new event:', error);
    }
  }

  /**
   * Clean up resources when shutting down
   */
  cleanup() {
    console.log('[SocketService] Cleaning up resources...');
    
    // Unsubscribe from Firestore listener
    if (this.eventsUnsubscribe) {
      this.eventsUnsubscribe();
      this.eventsUnsubscribe = null;
      console.log('[SocketService] Unsubscribed from Firestore events');
    }
    
    // Close all Socket.IO connections
    if (this.io) {
      this.io.close();
      this.io = null;
      console.log('[SocketService] Closed all Socket.IO connections');
    }
  }
}

// Export a singleton instance
module.exports = new SocketService();