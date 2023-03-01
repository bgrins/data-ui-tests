import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  Treemap,
} from "recharts";

import React, { PureComponent } from "react";
import ReactDOM from "react-dom/client";

function mount(element) {
  const container = document.createElement("div");
  ReactDOM.createRoot(container).render(
    <React.StrictMode>{element}</React.StrictMode>
  );
  return container;
}

export function line({ width, height }) {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];
  return mount(
    <LineChart width={width} height={height} data={data}>
      <Line
        type="monotone"
        dataKey="pv"
        stroke="#8884d8"
        strokeWidth={2}
        isAnimationActive={false}
      />
    </LineChart>
  );
}

export function custom({ width, height }) {
  const data = [{ name: "Page A", uv: 400, pv: 2400, amt: 2400 }];

  const renderCustomAxisTick = ({ x, y, payload }) => {
    let path = "";

    switch (payload.value) {
      case "Page A":
        path =
          "M899.072 99.328q9.216 13.312 17.92 48.128t16.384 81.92 13.824 100.352 11.264 102.912 9.216 90.112 6.144 60.928q4.096 30.72 7.168 70.656t5.632 79.872 4.096 75.264 2.56 56.832q-13.312 16.384-30.208 25.6t-34.304 11.264-34.304-2.56-30.208-16.896q-1.024-10.24-3.584-33.28t-6.144-53.76-8.192-66.56-8.704-71.68q-11.264-83.968-23.552-184.32-7.168 37.888-11.264 74.752-4.096 31.744-6.656 66.56t-0.512 62.464q1.024 18.432 3.072 29.184t4.608 19.968 5.12 21.504 5.12 34.304 5.12 56.832 4.608 90.112q-11.264 24.576-50.688 42.496t-88.576 29.696-97.28 16.896-74.752 5.12q-18.432 0-46.08-2.56t-60.416-7.168-66.048-12.288-61.952-17.92-49.664-24.064-28.16-30.208q2.048-55.296 5.12-90.112t5.632-56.832 5.12-34.304 5.12-21.504 4.096-19.968 3.584-29.184q2.048-27.648-0.512-62.464t-6.656-66.56q-4.096-36.864-11.264-74.752-13.312 100.352-24.576 184.32-5.12 35.84-9.216 71.68t-8.192 66.56-6.656 53.76-2.56 33.28q-13.312 12.288-30.208 16.896t-34.304 2.56-33.792-11.264-29.696-25.6q0-21.504 2.048-56.832t4.096-75.264 5.632-79.872 6.656-70.656q2.048-20.48 6.144-60.928t9.728-90.112 11.776-102.912 13.824-100.352 16.384-81.92 17.92-48.128q20.48-12.288 56.32-25.6t73.216-26.624 71.168-25.088 50.176-22.016q10.24 13.312 16.896 61.44t13.312 115.712 15.36 146.432 23.04 153.6l38.912-334.848-29.696-25.6 43.008-54.272 15.36 2.048 15.36-2.048 43.008 54.272-29.696 25.6 38.912 334.848q14.336-74.752 23.04-153.6t15.36-146.432 13.312-115.712 16.896-61.44q16.384 10.24 50.176 22.016t71.168 25.088 73.216 26.624 56.32 25.6";
        break;
      case "Page B":
        path =
          "M662.528 451.584q10.24 5.12 30.208 16.384t46.08 31.744 57.856 52.736 65.024 80.896 67.072 115.2 64.512 154.624q-15.36 9.216-31.232 21.504t-31.232 22.016-31.744 15.36-32.768 2.56q-44.032-9.216-78.336-8.192t-62.976 7.68-53.248 16.896-47.616 19.968-46.08 16.384-49.664 6.656q-57.344-1.024-110.592-16.896t-101.376-32.256-89.6-25.088-75.264 4.608q-20.48 8.192-41.984 1.024t-38.912-18.432q-20.48-13.312-39.936-33.792 37.888-116.736 86.016-199.68t92.672-136.704 78.848-81.408 43.52-33.792q9.216-5.12 10.24-25.088t-1.024-40.448q-3.072-24.576-9.216-54.272l-150.528-302.08 180.224-29.696q27.648 52.224 53.76 79.36t50.176 36.864 45.568 5.12 39.936-17.92q43.008-30.72 80.896-103.424l181.248 29.696q-20.48 48.128-45.056 99.328-20.48 44.032-47.616 97.28t-57.856 105.472q-12.288 34.816-13.824 57.344t1.536 36.864q4.096 16.384 12.288 25.6z";
        break;
      default:
        path = "";
    }

    return (
      <svg
        x={x - 12}
        y={y + 4}
        width={24}
        height={24}
        viewBox="0 0 1024 1024"
        fill="#666"
      >
        <path d={path} />
      </svg>
    );
  };

  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type="monotone" dataKey="uv" stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
      <XAxis dataKey="name" tick={renderCustomAxisTick} />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
}

// From https://recharts.org/en-US/examples/BubbleChart
export function bubble({ width, height }) {
  const data01 = [
    { hour: "12a", index: 1, value: 170 },
    { hour: "1a", index: 1, value: 180 },
    { hour: "2a", index: 1, value: 150 },
    { hour: "3a", index: 1, value: 120 },
    { hour: "4a", index: 1, value: 200 },
    { hour: "5a", index: 1, value: 300 },
    { hour: "6a", index: 1, value: 400 },
    { hour: "7a", index: 1, value: 200 },
    { hour: "8a", index: 1, value: 100 },
    { hour: "9a", index: 1, value: 150 },
    { hour: "10a", index: 1, value: 160 },
    { hour: "11a", index: 1, value: 170 },
    { hour: "12a", index: 1, value: 180 },
    { hour: "1p", index: 1, value: 144 },
    { hour: "2p", index: 1, value: 166 },
    { hour: "3p", index: 1, value: 145 },
    { hour: "4p", index: 1, value: 150 },
    { hour: "5p", index: 1, value: 170 },
    { hour: "6p", index: 1, value: 180 },
    { hour: "7p", index: 1, value: 165 },
    { hour: "8p", index: 1, value: 130 },
    { hour: "9p", index: 1, value: 140 },
    { hour: "10p", index: 1, value: 170 },
    { hour: "11p", index: 1, value: 180 },
  ];

  const data02 = [
    { hour: "12a", index: 1, value: 160 },
    { hour: "1a", index: 1, value: 180 },
    { hour: "2a", index: 1, value: 150 },
    { hour: "3a", index: 1, value: 120 },
    { hour: "4a", index: 1, value: 200 },
    { hour: "5a", index: 1, value: 300 },
    { hour: "6a", index: 1, value: 100 },
    { hour: "7a", index: 1, value: 200 },
    { hour: "8a", index: 1, value: 100 },
    { hour: "9a", index: 1, value: 150 },
    { hour: "10a", index: 1, value: 160 },
    { hour: "11a", index: 1, value: 160 },
    { hour: "12a", index: 1, value: 180 },
    { hour: "1p", index: 1, value: 144 },
    { hour: "2p", index: 1, value: 166 },
    { hour: "3p", index: 1, value: 145 },
    { hour: "4p", index: 1, value: 150 },
    { hour: "5p", index: 1, value: 160 },
    { hour: "6p", index: 1, value: 180 },
    { hour: "7p", index: 1, value: 165 },
    { hour: "8p", index: 1, value: 130 },
    { hour: "9p", index: 1, value: 140 },
    { hour: "10p", index: 1, value: 160 },
    { hour: "11p", index: 1, value: 180 },
  ];

  const parseDomain = () => [
    0,
    Math.max(
      Math.max.apply(
        null,
        data01.map((entry) => entry.value)
      ),
      Math.max.apply(
        null,
        data02.map((entry) => entry.value)
      )
    ),
  ];

  const renderTooltip = (props) => {
    const { active, payload } = props;

    if (active && payload && payload.length) {
      const data = payload[0] && payload[0].payload;

      return (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid #999",
            margin: 0,
            padding: 10,
          }}
        >
          <p>{data.hour}</p>
          <p>
            <span>value: </span>
            {data.value}
          </p>
        </div>
      );
    }

    return null;
  };

  const domain = parseDomain();
  const range = [16, 225];

  return mount(
    <div style={{ width: "100%" }}>
      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            name="sunday"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Sunday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Monday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#8884d8" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Tuesday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Wednesday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#8884d8" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Thursday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tick={{ fontSize: 0 }}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Friday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data02} fill="#8884d8" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height={60}>
        <ScatterChart
          width={800}
          height={60}
          margin={{
            top: 10,
            right: 0,
            bottom: 0,
            left: 0,
          }}
        >
          <XAxis
            type="category"
            dataKey="hour"
            name="hour"
            interval={0}
            tickLine={{ transform: "translate(0, -6)" }}
          />
          <YAxis
            type="number"
            dataKey="index"
            height={10}
            width={80}
            tick={false}
            tickLine={false}
            axisLine={false}
            label={{ value: "Saturday", position: "insideRight" }}
          />
          <ZAxis type="number" dataKey="value" domain={domain} range={range} />
          <Tooltip
            cursor={{ strokeDasharray: "3 3" }}
            wrapperStyle={{ zIndex: 100 }}
            content={renderTooltip}
          />
          <Scatter data={data01} fill="#8884d8" isAnimationActive={false} />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
}

// Adapted from https://recharts.org/en-US/examples/CustomContentTreemap
export function treemap({ width, height }) {
  const data = [
    {
      name: "axis",
      children: [
        { name: "Axes", size: 1302 },
        { name: "Axis", size: 24593 },
        { name: "AxisGridLine", size: 652 },
        { name: "AxisLabel", size: 636 },
        { name: "CartesianAxes", size: 6703 },
      ],
    },
    {
      name: "controls",
      children: [
        { name: "AnchorControl", size: 2138 },
        { name: "ClickControl", size: 3824 },
        { name: "Control", size: 1353 },
        { name: "ControlList", size: 4665 },
        { name: "DragControl", size: 2649 },
        { name: "ExpandControl", size: 2832 },
        { name: "HoverControl", size: 4896 },
        { name: "IControl", size: 763 },
        { name: "PanZoomControl", size: 5222 },
        { name: "SelectionControl", size: 7862 },
        { name: "TooltipControl", size: 8435 },
      ],
    },
    {
      name: "data",
      children: [
        { name: "Data", size: 20544 },
        { name: "DataList", size: 19788 },
        { name: "DataSprite", size: 10349 },
        { name: "EdgeSprite", size: 3301 },
        { name: "NodeSprite", size: 19382 },
        {
          name: "render",
          children: [
            { name: "ArrowType", size: 698 },
            { name: "EdgeRenderer", size: 5569 },
            { name: "IRenderer", size: 353 },
            { name: "ShapeRenderer", size: 2247 },
          ],
        },
        { name: "ScaleBinding", size: 11275 },
        { name: "Tree", size: 7147 },
        { name: "TreeBuilder", size: 9930 },
      ],
    },
    {
      name: "events",
      children: [
        { name: "DataEvent", size: 7313 },
        { name: "SelectionEvent", size: 6880 },
        { name: "TooltipEvent", size: 3701 },
        { name: "VisualizationEvent", size: 2117 },
      ],
    },
    {
      name: "legend",
      children: [
        { name: "Legend", size: 20859 },
        { name: "LegendItem", size: 4614 },
        { name: "LegendRange", size: 10530 },
      ],
    },
    {
      name: "operator",
      children: [
        {
          name: "distortion",
          children: [
            { name: "BifocalDistortion", size: 4461 },
            { name: "Distortion", size: 6314 },
            { name: "FisheyeDistortion", size: 3444 },
          ],
        },
        {
          name: "encoder",
          children: [
            { name: "ColorEncoder", size: 3179 },
            { name: "Encoder", size: 4060 },
            { name: "PropertyEncoder", size: 4138 },
            { name: "ShapeEncoder", size: 1690 },
            { name: "SizeEncoder", size: 1830 },
          ],
        },
        {
          name: "filter",
          children: [
            { name: "FisheyeTreeFilter", size: 5219 },
            { name: "GraphDistanceFilter", size: 3165 },
            { name: "VisibilityFilter", size: 3509 },
          ],
        },
        { name: "IOperator", size: 1286 },
        {
          name: "label",
          children: [
            { name: "Labeler", size: 9956 },
            { name: "RadialLabeler", size: 3899 },
            { name: "StackedAreaLabeler", size: 3202 },
          ],
        },
        {
          name: "layout",
          children: [
            { name: "AxisLayout", size: 6725 },
            { name: "BundledEdgeRouter", size: 3727 },
            { name: "CircleLayout", size: 9317 },
            { name: "CirclePackingLayout", size: 12003 },
            { name: "DendrogramLayout", size: 4853 },
            { name: "ForceDirectedLayout", size: 8411 },
            { name: "IcicleTreeLayout", size: 4864 },
            { name: "IndentedTreeLayout", size: 3174 },
            { name: "Layout", size: 7881 },
            { name: "NodeLinkTreeLayout", size: 12870 },
            { name: "PieLayout", size: 2728 },
            { name: "RadialTreeLayout", size: 12348 },
            { name: "RandomLayout", size: 870 },
            { name: "StackedAreaLayout", size: 9121 },
            { name: "TreeMapLayout", size: 9191 },
          ],
        },
        { name: "Operator", size: 2490 },
        { name: "OperatorList", size: 5248 },
        { name: "OperatorSequence", size: 4190 },
        { name: "OperatorSwitch", size: 2581 },
        { name: "SortOperator", size: 2023 },
      ],
    },
  ];

  const COLORS = [
    "#8889DD",
    "#9597E4",
    "#8DC77B",
    "#A5D297",
    "#E2CF45",
    "#F8C12D",
  ];

  class CustomizedContent extends PureComponent {
    render() {
      const {
        root,
        depth,
        x,
        y,
        width,
        height,
        index,
        payload,
        colors,
        rank,
        name,
      } = this.props;

      return (
        <g>
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            style={{
              fill:
                depth < 2
                  ? colors[Math.floor((index / root.children.length) * 6)]
                  : "#ffffff00",
              stroke: "#fff",
              strokeWidth: 2 / (depth + 1e-10),
              strokeOpacity: 1 / (depth + 1e-10),
            }}
          />
          {depth === 1 ? (
            <text
              x={x + width / 2}
              y={y + height / 2 + 7}
              textAnchor="middle"
              fill="#fff"
              fontSize={14}
            >
              {name}
            </text>
          ) : null}
          {depth === 1 ? (
            <text
              x={x + 4}
              y={y + 18}
              fill="#fff"
              fontSize={16}
              fillOpacity={0.9}
            >
              {index + 1}
            </text>
          ) : null}
        </g>
      );
    }
  }

  return mount(
    <Treemap
      width={width}
      height={height}
      data={data}
      dataKey="size"
      stroke="#fff"
      fill="#8884d8"
      isAnimationActive={false}
      content={<CustomizedContent colors={COLORS} />}
    />
  );
}
