import React, { useEffect, useMemo, useState } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  Autocomplete,
  Box,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";

const fetchKeys = async () => {
  try {
    const response = await fetch(`http://127.0.0.1:8000/api/objectKeys`);
    const json = await response.json();
    return json.keys;
  } catch (error) {
    console.error("Error fetching keys:", error);
    return [];
  }
};

const fetchSmaData = async (dataId, smaPeriodDays) => {
  try {
    const response = await fetch(
      `http://127.0.0.1:8000/api/sma/${dataId}/${smaPeriodDays}`
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error("Error fetching SMA data:", error);
    return { sma_data: [], original_data: [] };
  }
};

const Graph = () => {
  const [instrument, setInstrument] = useState("");
  const [smaPeriod, setSmaPeriod] = useState(1);
  const [smaData, setSmaData] = useState([]);
  const [baseData, setBaseData] = useState([]);
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useMemo(() => {
    const loadKeys = async () => {
      const keys = await fetchKeys();
      setOptions(keys);
      if (keys.length > 0) setInstrument(keys[0]);
    };
    loadKeys();
  }, []);

  useEffect(() => {
    if (!instrument) return;

    const getData = async () => {
      setIsLoading(true);
      const result = await fetchSmaData(instrument, smaPeriod);

      const sortedOriginal = result.original_data
        ? [...result.original_data].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        : [];

      const sortedSma = result.sma_data
        ? [...result.sma_data].sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          )
        : [];

      setBaseData(sortedOriginal);
      setSmaData(sortedSma);
      setIsLoading(false);
    };

    getData();
  }, [instrument, smaPeriod]);

  const graphData = baseData.map((day) => day.price);
  const smaLineData = smaData.map((day) => day.price);
  const axisData = baseData.map((day) => day.date);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "row",
          gap: 1,
        }}
      >
        <Autocomplete
          sx={{ width: "200px", mb: 2 }}
          options={options}
          value={instrument}
          disabled={isLoading}
          onChange={(e, newValue) => {
            newValue && setInstrument(newValue);
          }}
          renderInput={(params) => (
            <TextField label="Instrument" {...params} variant="outlined" />
          )}
        />

        <TextField
          label="SMA Period"
          type="number"
          value={smaPeriod}
          onChange={(e) => setSmaPeriod(e.target.value)}
          sx={{ mb: 2 }}
          variant="outlined"
        />
      </Box>

      {isLoading ? (
        <Box display="flex" alignItems="center" gap={2}>
          <CircularProgress size={24} />
          <Typography>Loading data...</Typography>
        </Box>
      ) : (
        <LineChart
          height={400}
          xAxis={[
            {
              data: axisData,
              scaleType: "band",
            },
          ]}
          series={[
            {
              type: "line",
              data: graphData,
              color: "#D50000",
              showMark: false,
              label: "Original Data",
            },
            {
              type: "line",
              data: smaLineData,
              color: "#2196F3",
              showMark: false,
              label: "SMA",
            },
          ]}
        />
      )}
    </Box>
  );
};

export default Graph;
