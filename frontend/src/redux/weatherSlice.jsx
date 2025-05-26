import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BACKEND_URL = 'http://localhost:5000/api/weather'; 

// Async Thunk for fetching current weather
export const fetchCurrentWeather = createAsyncThunk(
  'weather/fetchCurrentWeather',
  async (location, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/current/${location}`);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async Thunk for fetching historical weather (optional for the initial UI, but good to have)
export const fetchHistoricalWeather = createAsyncThunk(
  'weather/fetchHistoricalWeather',
  async ({ location, fromDate, toDate }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BACKEND_URL}/history`, {
        params: { location, fromDate, toDate },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


const weatherSlice = createSlice({
  name: 'weather',
  initialState: {
    currentWeather: null,
    historicalWeather: [],
    loading: false,
    error: null,
    currentLocation: 'London' // Default location for display
  },
  reducers: {
    setCurrentLocation: (state, action) => {
        state.currentLocation = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Current Weather
      .addCase(fetchCurrentWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.currentWeather = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.currentWeather = null;
      })
      // Historical Weather (for future use/display)
      .addCase(fetchHistoricalWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistoricalWeather.fulfilled, (state, action) => {
        state.loading = false;
        state.historicalWeather = action.payload;
        state.error = null;
      })
      .addCase(fetchHistoricalWeather.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.historicalWeather = [];
      });
  },
});

export const { setCurrentLocation } = weatherSlice.actions;

export default weatherSlice.reducer;