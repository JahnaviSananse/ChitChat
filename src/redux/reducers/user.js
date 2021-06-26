import * as TYPE from "../types/user";
const initialState = {
  loading: false,
  feeds: [],
  chat: {},
  recentChat: [],
  users: [],
  addFeed: false,
  uploadedData: {},
};
export default (state = initialState, action) => {
  switch (action.type) {
    //feed like unlike
    case TYPE.FEED_LIKE_UNLIKE_REQUEST: {
      return {
        ...state,
        loading: false,
        // uploadedData: {},
        // addFeed: false,
        // feeds: [],
      };
    }
    case TYPE.FEED_LIKE_UNLIKE_SUCCESS: {
      return {
        ...state,
        loading: false,
        // uploadedData: action.payload,
        // addFeed: true,
        // feeds: action.payload,
      };
    }
    case TYPE.FEED_LIKE_UNLIKE_ERROR: {
      return {
        ...state,
        loading: false,
        // uploadedData: {},
        // addFeed: false,
        // feeds: [],
      };
    }

    //save doc
    case TYPE.SAVE_DOCUMENT_REQUEST: {
      return {
        ...state,
        loading: true,
        uploadedData: {},
        // addFeed: false,
        // feeds: [],
      };
    }
    //
    case TYPE.SAVE_DOCUMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        uploadedData: action.payload,
        // addFeed: true,
        // feeds: action.payload,
      };
    }
    case TYPE.SAVE_DOCUMENT_ERROR: {
      return {
        ...state,
        loading: false,
        uploadedData: {},
        // addFeed: false,
        // feeds: [],
      };
    }
    case TYPE.CLEAR_SAVE_DOCUMENT_REQUEST: {
      return {
        ...state,
        loading: false,
        uploadedData: {},
        // addFeed: false,
        // feeds: [],
      };
    }

    //add feed
    case TYPE.ADD_FEED_REQUEST: {
      return {
        ...state,
        loading: true,
        // addFeed: false,
        // feeds: [],
      };
    }
    case TYPE.ADD_FEED_SUCCESS: {
      return {
        ...state,
        loading: false,
        // addFeed: true,
        // feeds: action.payload,
      };
    }
    case TYPE.ADD_FEED_ERROR: {
      return {
        ...state,
        loading: false,
        // addFeed: false,
        // feeds: [],
      };
    }

    //list feed
    case TYPE.GET_FEED_REQUEST: {
      return {
        ...state,
        loading: true,
        feeds: [],
      };
    }
    case TYPE.GET_FEED_SUCCESS: {
      return {
        ...state,
        loading: false,
        feeds: action.payload,
      };
    }
    case TYPE.GET_FEED_ERROR: {
      return {
        ...state,
        loading: false,
        feeds: [],
      };
    }

    //list recent chat
    case TYPE.GET_RECENT_CHAT_REQUEST: {
      return {
        ...state,
        loading: true,
        recentChat: [],
      };
    }
    case TYPE.GET_RECENT_CHAT_SUCCESS: {
      return {
        ...state,
        loading: false,
        recentChat: action.payload,
      };
    }
    case TYPE.GET_RECENT_CHAT_ERROR: {
      return {
        ...state,
        loading: false,
        recentChat: [],
      };
    }

    //list  chat
    case TYPE.GET_CHAT_REQUEST: {
      return {
        ...state,
        loading: true,
        chat: {},
      };
    }
    case TYPE.GET_CHAT_SUCCESS: {
      return {
        ...state,
        loading: false,
        chat: action.payload,
      };
    }
    case TYPE.GET_CHAT_ERROR: {
      return {
        ...state,
        loading: false,
        chat: {},
      };
    }

    //list users
    case TYPE.GET_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
        users: [],
      };
    }
    case TYPE.GET_USERS_SUCCESS: {
      return {
        ...state,
        loading: false,
        users: action.payload,
      };
    }
    case TYPE.GET_USERS_ERROR: {
      return {
        ...state,
        loading: false,
        users: [],
      };
    }

    default:
      return state;
  }
};
