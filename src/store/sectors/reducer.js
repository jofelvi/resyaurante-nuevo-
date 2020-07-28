import { SECTOR_START, SECTOR_END, SECTOR_FAIL, SET_SECTOR_SUCCESS } from "./Constants";

const initialState = {
  error: null,
  loading: false,
  msg: "",
  sectors: [],
  sectorEdit: null,
};

export default function (state = initialState, { type, payload }) {
  switch (type) {
    case SECTOR_START: {
      return { ...state, loading: true, error: null };
    }

    case SECTOR_END: {
      return { ...state, loading: false };
    }

    case SECTOR_FAIL: {
      return { ...state, ...payload };
    }

    case SET_SECTOR_SUCCESS: {
      return {
        ...state,
        error: false,
        loading: false,
        ...payload,
      };
    }
    default:
      return state;
  }
}
