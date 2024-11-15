"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  SeriesMarker,
  SeriesOptionsMap,
  Time,
  UTCTimestamp,
} from "lightweight-charts";

import { useChart, useUserSeries } from "@/hooks";
import { initialState } from "@/lib/redux/features/chart/chart";
import { cn } from "@/nextjs/lib/utils";

import { PRICE_SCALE } from "@/chart/position";

import { Data } from "@/objects/data/data";
import { createIndicator, updateIndicator } from "@/objects/indicator";
import { createSeries } from "@/objects/series";

const initialData = [
  ["2024-03-26T09:15:00+05:30", 59.6, 59.9, 59, 59.3, 718814],
  ["2024-03-26T09:20:00+05:30", 59.3, 59.3, 58.95, 59.3, 643418],
  ["2024-03-26T09:25:00+05:30", 59.3, 59.35, 59, 59.15, 394112],
  ["2024-03-26T09:30:00+05:30", 59.1, 59.1, 58.55, 58.55, 427447],
  ["2024-03-26T09:35:00+05:30", 58.6, 58.6, 57.85, 58.1, 799482],
  ["2024-03-26T09:40:00+05:30", 58.2, 58.35, 58.1, 58.3, 206271],
  ["2024-03-26T09:45:00+05:30", 58.3, 58.5, 58.05, 58.4, 207317],
  ["2024-03-26T09:50:00+05:30", 58.35, 58.8, 58.25, 58.75, 261973],
  ["2024-03-26T09:55:00+05:30", 58.85, 58.95, 58.7, 58.8, 258274],
  ["2024-03-26T10:00:00+05:30", 58.85, 58.9, 58.65, 58.8, 169441],
  ["2024-03-26T10:05:00+05:30", 58.8, 58.8, 58.5, 58.55, 87278],
  ["2024-03-26T10:10:00+05:30", 58.55, 58.7, 58.45, 58.65, 121147],
  ["2024-03-26T10:15:00+05:30", 58.65, 58.65, 58.5, 58.55, 57514],
  ["2024-03-26T10:20:00+05:30", 58.5, 58.55, 58.35, 58.4, 111515],
  ["2024-03-26T10:25:00+05:30", 58.45, 58.85, 58.45, 58.75, 90411],
  ["2024-03-26T10:30:00+05:30", 58.75, 58.85, 58.6, 58.6, 58469],
  ["2024-03-26T10:35:00+05:30", 58.65, 58.8, 58.6, 58.65, 84355],
  ["2024-03-26T10:40:00+05:30", 58.65, 58.8, 58.6, 58.65, 91376],
  ["2024-03-26T10:45:00+05:30", 58.7, 58.75, 58.6, 58.7, 70809],
  ["2024-03-26T10:50:00+05:30", 58.75, 58.8, 58.5, 58.6, 101336],
  ["2024-03-26T10:55:00+05:30", 58.6, 58.75, 58.55, 58.6, 68220],
  ["2024-03-26T11:00:00+05:30", 58.6, 58.75, 58.5, 58.75, 49369],
  ["2024-03-26T11:05:00+05:30", 58.75, 58.8, 58.65, 58.75, 90311],
  ["2024-03-26T11:10:00+05:30", 58.7, 58.8, 58.65, 58.75, 49425],
  ["2024-03-26T11:15:00+05:30", 58.75, 58.75, 58.7, 58.7, 30635],
  ["2024-03-26T11:20:00+05:30", 58.7, 58.8, 58.7, 58.8, 43151],
  ["2024-03-26T11:25:00+05:30", 58.7, 58.95, 58.7, 58.9, 119612],
  ["2024-03-26T11:30:00+05:30", 58.9, 59.1, 58.85, 58.95, 178770],
  ["2024-03-26T11:35:00+05:30", 58.95, 59, 58.85, 58.9, 42072],
  ["2024-03-26T11:40:00+05:30", 58.85, 58.95, 58.85, 58.95, 37748],
  ["2024-03-26T11:45:00+05:30", 58.9, 59.05, 58.85, 59.05, 41467],
  ["2024-03-26T11:50:00+05:30", 59, 59.1, 58.85, 59, 58133],
  ["2024-03-26T11:55:00+05:30", 58.95, 58.95, 58.8, 58.85, 78418],
  ["2024-03-26T12:00:00+05:30", 58.85, 58.95, 58.85, 58.9, 29955],
  ["2024-03-26T12:05:00+05:30", 58.85, 58.95, 58.85, 58.85, 51856],
  ["2024-03-26T12:10:00+05:30", 58.9, 58.95, 58.7, 58.75, 60251],
  ["2024-03-26T12:15:00+05:30", 58.75, 58.75, 58.6, 58.65, 69737],
  ["2024-03-26T12:20:00+05:30", 58.65, 58.7, 58.6, 58.7, 23495],
  ["2024-03-26T12:25:00+05:30", 58.65, 58.7, 58.6, 58.7, 87378],
  ["2024-03-26T12:30:00+05:30", 58.65, 58.7, 58.6, 58.65, 23628],
  ["2024-03-26T12:35:00+05:30", 58.65, 58.7, 58.6, 58.7, 25906],
  ["2024-03-26T12:40:00+05:30", 58.65, 58.75, 58.6, 58.75, 25994],
  ["2024-03-26T12:45:00+05:30", 58.75, 58.75, 58.65, 58.7, 28876],
  ["2024-03-26T12:50:00+05:30", 58.7, 58.8, 58.6, 58.75, 58670],
  ["2024-03-26T12:55:00+05:30", 58.7, 58.9, 58.7, 58.9, 43068],
  ["2024-03-26T13:00:00+05:30", 58.85, 58.9, 58.75, 58.75, 50568],
  ["2024-03-26T13:05:00+05:30", 58.8, 58.85, 58.7, 58.85, 27250],
  ["2024-03-26T13:10:00+05:30", 58.85, 58.85, 58.7, 58.7, 25415],
  ["2024-03-26T13:15:00+05:30", 58.75, 58.8, 58.6, 58.75, 74407],
  ["2024-03-26T13:20:00+05:30", 58.7, 58.85, 58.7, 58.8, 46336],
  ["2024-03-26T13:25:00+05:30", 58.8, 58.8, 58.65, 58.65, 69665],
  ["2024-03-26T13:30:00+05:30", 58.7, 58.75, 58.6, 58.65, 45618],
  ["2024-03-26T13:35:00+05:30", 58.7, 58.7, 58.6, 58.7, 45491],
  ["2024-03-26T13:40:00+05:30", 58.7, 58.7, 58.6, 58.65, 30709],
  ["2024-03-26T13:45:00+05:30", 58.7, 58.8, 58.65, 58.75, 43900],
  ["2024-03-26T13:50:00+05:30", 58.75, 58.8, 58.65, 58.7, 43986],
  ["2024-03-26T13:55:00+05:30", 58.75, 58.8, 58.7, 58.75, 25683],
  ["2024-03-26T14:00:00+05:30", 58.75, 58.85, 58.7, 58.8, 68922],
  ["2024-03-26T14:05:00+05:30", 58.8, 58.85, 58.75, 58.85, 40817],
  ["2024-03-26T14:10:00+05:30", 58.85, 58.85, 58.7, 58.75, 31929],
  ["2024-03-26T14:15:00+05:30", 58.7, 58.75, 58.65, 58.75, 55212],
  ["2024-03-26T14:20:00+05:30", 58.75, 58.85, 58.7, 58.85, 97610],
  ["2024-03-26T14:25:00+05:30", 58.85, 58.85, 58.7, 58.75, 37097],
  ["2024-03-26T14:30:00+05:30", 58.7, 58.8, 58.6, 58.7, 86037],
  ["2024-03-26T14:35:00+05:30", 58.65, 58.7, 58.55, 58.55, 77642],
  ["2024-03-26T14:40:00+05:30", 58.6, 58.6, 58.5, 58.6, 317577],
  ["2024-03-26T14:45:00+05:30", 58.55, 58.6, 58.5, 58.55, 77484],
  ["2024-03-26T14:50:00+05:30", 58.45, 58.45, 58.2, 58.35, 399804],
  ["2024-03-26T14:55:00+05:30", 58.35, 58.4, 58.2, 58.4, 184252],
  ["2024-03-26T15:00:00+05:30", 58.4, 58.45, 58.3, 58.35, 111507],
  ["2024-03-26T15:05:00+05:30", 58.4, 58.4, 58.25, 58.35, 134616],
  ["2024-03-26T15:10:00+05:30", 58.4, 58.4, 58.25, 58.35, 179761],
  ["2024-03-26T15:15:00+05:30", 58.35, 58.4, 58.25, 58.3, 227875],
  ["2024-03-26T15:20:00+05:30", 58.25, 58.35, 58.2, 58.3, 259163],
  ["2024-03-26T15:25:00+05:30", 58.3, 58.4, 58.25, 58.3, 315794],
  ["2024-03-27T09:15:00+05:30", 58.55, 59.25, 58.55, 58.8, 594541],
  ["2024-03-27T09:20:00+05:30", 58.9, 58.9, 58.5, 58.6, 396220],
  ["2024-03-27T09:25:00+05:30", 58.65, 59.1, 58.6, 59.05, 227033],
  ["2024-03-27T09:30:00+05:30", 59, 59.05, 58.8, 58.9, 232457],
  ["2024-03-27T09:35:00+05:30", 58.95, 59.05, 58.9, 59, 116576],
  ["2024-03-27T09:40:00+05:30", 59.05, 59.2, 59, 59.1, 225996],
  ["2024-03-27T09:45:00+05:30", 59, 59.05, 58.65, 58.65, 188686],
  ["2024-03-27T09:50:00+05:30", 58.7, 58.75, 58.45, 58.75, 627187],
  ["2024-03-27T09:55:00+05:30", 58.75, 59.1, 58.7, 59, 215928],
  ["2024-03-27T10:00:00+05:30", 59.05, 59.05, 58.95, 59.05, 95526],
  ["2024-03-27T10:05:00+05:30", 59.05, 59.05, 58.75, 58.9, 95498],
  ["2024-03-27T10:10:00+05:30", 58.9, 58.9, 58.75, 58.75, 61507],
  ["2024-03-27T10:15:00+05:30", 58.75, 58.8, 58.7, 58.8, 80602],
  ["2024-03-27T10:20:00+05:30", 58.8, 59.55, 58.75, 59.2, 1520067],
  ["2024-03-27T10:25:00+05:30", 59.2, 59.25, 58.8, 58.9, 993409],
  ["2024-03-27T10:30:00+05:30", 58.85, 59.2, 58.75, 59.1, 344544],
  ["2024-03-27T10:35:00+05:30", 59.05, 59.25, 59.05, 59.1, 118674],
  ["2024-03-27T10:40:00+05:30", 59.1, 59.25, 59.05, 59.1, 88056],
  ["2024-03-27T10:45:00+05:30", 59.15, 59.45, 59, 59.25, 212941],
  ["2024-03-27T10:50:00+05:30", 59.25, 59.35, 59.05, 59.1, 88247],
  ["2024-03-27T10:55:00+05:30", 59.1, 59.4, 59.05, 59.35, 103363],
  ["2024-03-27T11:00:00+05:30", 59.35, 59.85, 59.25, 59.75, 548805],
  ["2024-03-27T11:05:00+05:30", 59.7, 59.7, 59.4, 59.45, 150606],
  ["2024-03-27T11:10:00+05:30", 59.45, 59.45, 59.2, 59.25, 92481],
  ["2024-03-27T11:15:00+05:30", 59.25, 59.5, 59.25, 59.4, 160847],
  ["2024-03-27T11:20:00+05:30", 59.4, 59.4, 59.15, 59.15, 76055],
  ["2024-03-27T11:25:00+05:30", 59.2, 59.3, 59.15, 59.2, 143131],
  ["2024-03-27T11:30:00+05:30", 59.15, 59.2, 58.95, 59, 204031],
  ["2024-03-27T11:35:00+05:30", 59.05, 59.2, 59, 59.1, 164907],
  ["2024-03-27T11:40:00+05:30", 59.1, 59.15, 58.95, 59, 109567],
  ["2024-03-27T11:45:00+05:30", 59, 59.35, 58.9, 59.2, 186636],
  ["2024-03-27T11:50:00+05:30", 59.2, 59.2, 59, 59.05, 84209],
  ["2024-03-27T11:55:00+05:30", 59, 59.15, 59, 59.05, 59509],
  ["2024-03-27T12:00:00+05:30", 59.05, 59.45, 59, 59.3, 175014],
  ["2024-03-27T12:05:00+05:30", 59.3, 59.3, 59.15, 59.15, 27093],
  ["2024-03-27T12:10:00+05:30", 59.15, 59.25, 59.1, 59.15, 42352],
  ["2024-03-27T12:15:00+05:30", 59.25, 59.4, 59.25, 59.35, 88243],
  ["2024-03-27T12:20:00+05:30", 59.35, 59.35, 59.1, 59.2, 56797],
  ["2024-03-27T12:25:00+05:30", 59.2, 59.3, 59.1, 59.2, 91820],
  ["2024-03-27T12:30:00+05:30", 59.2, 59.2, 59.05, 59.1, 50902],
  ["2024-03-27T12:35:00+05:30", 59.1, 59.25, 59.1, 59.15, 49077],
  ["2024-03-27T12:40:00+05:30", 59.2, 59.25, 59.15, 59.2, 22132],
  ["2024-03-27T12:45:00+05:30", 59.25, 59.4, 59.15, 59.3, 116266],
  ["2024-03-27T12:50:00+05:30", 59.3, 59.4, 59.25, 59.4, 46726],
  ["2024-03-27T12:55:00+05:30", 59.4, 59.4, 59.3, 59.3, 42939],
  ["2024-03-27T13:00:00+05:30", 59.35, 59.45, 59.3, 59.45, 69667],
  ["2024-03-27T13:05:00+05:30", 59.45, 59.8, 59.3, 59.65, 362910],
  ["2024-03-27T13:10:00+05:30", 59.65, 59.7, 59.55, 59.6, 110529],
  ["2024-03-27T13:15:00+05:30", 59.6, 59.9, 59.6, 59.8, 335617],
  ["2024-03-27T13:20:00+05:30", 59.85, 59.95, 59.7, 59.7, 331813],
  ["2024-03-27T13:25:00+05:30", 59.75, 59.75, 59.6, 59.65, 66662],
  ["2024-03-27T13:30:00+05:30", 59.6, 59.85, 59.6, 59.7, 116895],
  ["2024-03-27T13:35:00+05:30", 59.8, 59.8, 59.65, 59.75, 53180],
  ["2024-03-27T13:40:00+05:30", 59.75, 59.85, 59.7, 59.7, 114918],
  ["2024-03-27T13:45:00+05:30", 59.7, 59.9, 59.7, 59.9, 169448],
  ["2024-03-27T13:50:00+05:30", 59.8, 59.85, 59.7, 59.8, 126841],
  ["2024-03-27T13:55:00+05:30", 59.75, 59.85, 59.75, 59.8, 65493],
  ["2024-03-27T14:00:00+05:30", 59.8, 59.85, 59.55, 59.65, 217944],
  ["2024-03-27T14:05:00+05:30", 59.65, 59.8, 59.6, 59.7, 90956],
  ["2024-03-27T14:10:00+05:30", 59.7, 59.9, 59.65, 59.7, 1548922],
  ["2024-03-27T14:15:00+05:30", 59.65, 59.75, 59.55, 59.75, 279830],
  ["2024-03-27T14:20:00+05:30", 59.65, 59.75, 59.55, 59.55, 69123],
  ["2024-03-27T14:25:00+05:30", 59.55, 59.6, 59.4, 59.4, 77766],
  ["2024-03-27T14:30:00+05:30", 59.4, 59.45, 59.3, 59.4, 113872],
  ["2024-03-27T14:35:00+05:30", 59.4, 59.5, 59.35, 59.5, 122243],
  ["2024-03-27T14:40:00+05:30", 59.55, 59.6, 59.4, 59.45, 67133],
  ["2024-03-27T14:45:00+05:30", 59.4, 59.5, 59.3, 59.45, 118275],
  ["2024-03-27T14:50:00+05:30", 59.5, 59.5, 59.3, 59.3, 138217],
  ["2024-03-27T14:55:00+05:30", 59.3, 59.6, 59.2, 59.4, 341283],
  ["2024-03-27T15:00:00+05:30", 59.35, 59.35, 58.85, 58.9, 671625],
  ["2024-03-27T15:05:00+05:30", 58.85, 59.05, 58.55, 58.6, 618973],
  ["2024-03-27T15:10:00+05:30", 58.7, 59.05, 58.6, 58.95, 385559],
  ["2024-03-27T15:15:00+05:30", 58.85, 59.1, 58.75, 58.85, 627497],
  ["2024-03-27T15:20:00+05:30", 58.9, 59, 58.75, 58.95, 373687],
  ["2024-03-27T15:25:00+05:30", 59, 59.2, 58.85, 58.85, 332719],
  ["2024-03-28T09:15:00+05:30", 59.45, 60, 59.3, 59.85, 889946],
  ["2024-03-28T09:20:00+05:30", 59.9, 59.9, 59.4, 59.45, 432301],
  ["2024-03-28T09:25:00+05:30", 59.45, 59.45, 59.1, 59.1, 318897],
  ["2024-03-28T09:30:00+05:30", 59.1, 59.4, 59, 59.35, 186376],
  ["2024-03-28T09:35:00+05:30", 59.4, 59.4, 59.25, 59.35, 108949],
  ["2024-03-28T09:40:00+05:30", 59.3, 59.4, 59.2, 59.35, 94513],
  ["2024-03-28T09:45:00+05:30", 59.35, 59.4, 59.25, 59.3, 145923],
  ["2024-03-28T09:50:00+05:30", 59.35, 59.35, 59.1, 59.3, 136122],
  ["2024-03-28T09:55:00+05:30", 59.3, 59.35, 59.15, 59.3, 65496],
  ["2024-03-28T10:00:00+05:30", 59.3, 59.35, 59.25, 59.25, 40427],
  ["2024-03-28T10:05:00+05:30", 59.35, 59.4, 59.1, 59.15, 244755],
  ["2024-03-28T10:10:00+05:30", 59.1, 59.2, 59, 59, 102194],
  ["2024-03-28T10:15:00+05:30", 59.05, 59.25, 59, 59.15, 293154],
  ["2024-03-28T10:20:00+05:30", 59.05, 59.1, 59, 59.05, 122347],
  ["2024-03-28T10:25:00+05:30", 59, 59.15, 58.9, 58.95, 369685],
  ["2024-03-28T10:30:00+05:30", 58.9, 59, 58.7, 58.75, 190115],
  ["2024-03-28T10:35:00+05:30", 58.7, 59, 58.7, 58.9, 188165],
  ["2024-03-28T10:40:00+05:30", 58.9, 58.9, 58.75, 58.8, 142230],
  ["2024-03-28T10:45:00+05:30", 58.8, 58.8, 58.7, 58.8, 69838],
  ["2024-03-28T10:50:00+05:30", 58.8, 58.85, 58.7, 58.85, 90228],
  ["2024-03-28T10:55:00+05:30", 58.8, 58.85, 58.7, 58.7, 55546],
  ["2024-03-28T11:00:00+05:30", 58.7, 58.95, 58.7, 58.95, 50479],
  ["2024-03-28T11:05:00+05:30", 58.95, 58.95, 58.75, 58.9, 83532],
  ["2024-03-28T11:10:00+05:30", 58.95, 58.95, 58.75, 58.8, 117807],
  ["2024-03-28T11:15:00+05:30", 58.75, 58.85, 58.7, 58.8, 74171],
  ["2024-03-28T11:20:00+05:30", 58.8, 58.9, 58.75, 58.8, 28992],
  ["2024-03-28T11:25:00+05:30", 58.85, 59, 58.8, 58.9, 40968],
  ["2024-03-28T11:30:00+05:30", 58.9, 59, 58.8, 59, 64985],
  ["2024-03-28T11:35:00+05:30", 59, 59.2, 58.95, 59.05, 114920],
  ["2024-03-28T11:40:00+05:30", 59.1, 59.1, 58.95, 59.05, 108319],
  ["2024-03-28T11:45:00+05:30", 59, 59.05, 59, 59.05, 35201],
  ["2024-03-28T11:50:00+05:30", 59.05, 59.05, 58.9, 58.95, 52250],
  ["2024-03-28T11:55:00+05:30", 58.9, 58.95, 58.8, 58.8, 48490],
  ["2024-03-28T12:00:00+05:30", 58.8, 58.95, 58.75, 58.95, 95326],
  ["2024-03-28T12:05:00+05:30", 58.95, 58.95, 58.85, 58.9, 41184],
  ["2024-03-28T12:10:00+05:30", 58.85, 58.95, 58.85, 58.95, 31200],
  ["2024-03-28T12:15:00+05:30", 58.9, 58.95, 58.8, 58.85, 82813],
  ["2024-03-28T12:20:00+05:30", 58.85, 58.9, 58.8, 58.9, 19619],
  ["2024-03-28T12:25:00+05:30", 58.85, 58.9, 58.75, 58.8, 45163],
  ["2024-03-28T12:30:00+05:30", 58.75, 58.9, 58.75, 58.9, 58948],
  ["2024-03-28T12:35:00+05:30", 58.9, 58.9, 58.75, 58.8, 104265],
  ["2024-03-28T12:40:00+05:30", 58.75, 58.9, 58.75, 58.85, 66045],
  ["2024-03-28T12:45:00+05:30", 58.8, 58.9, 58.75, 58.8, 45291],
  ["2024-03-28T12:50:00+05:30", 58.8, 58.85, 58.75, 58.8, 78795],
  ["2024-03-28T12:55:00+05:30", 58.8, 58.8, 58.55, 58.65, 162028],
  ["2024-03-28T13:00:00+05:30", 58.65, 58.75, 58.6, 58.65, 37747],
  ["2024-03-28T13:05:00+05:30", 58.65, 58.7, 58.6, 58.65, 83982],
  ["2024-03-28T13:10:00+05:30", 58.65, 58.75, 58.6, 58.75, 26593],
  ["2024-03-28T13:15:00+05:30", 58.75, 58.75, 58.65, 58.65, 37010],
  ["2024-03-28T13:20:00+05:30", 58.7, 58.7, 58.5, 58.65, 172234],
  ["2024-03-28T13:25:00+05:30", 58.65, 58.7, 58.6, 58.6, 61708],
  ["2024-03-28T13:30:00+05:30", 58.65, 58.65, 58.55, 58.6, 51311],
  ["2024-03-28T13:35:00+05:30", 58.55, 58.6, 58.5, 58.6, 42393],
  ["2024-03-28T13:40:00+05:30", 58.6, 58.6, 58.5, 58.6, 68851],
  ["2024-03-28T13:45:00+05:30", 58.6, 58.6, 58.55, 58.6, 47873],
  ["2024-03-28T13:50:00+05:30", 58.6, 58.65, 58.5, 58.55, 77972],
  ["2024-03-28T13:55:00+05:30", 58.5, 58.65, 58.5, 58.6, 79519],
  ["2024-03-28T14:00:00+05:30", 58.6, 58.65, 58.35, 58.45, 168205],
  ["2024-03-28T14:05:00+05:30", 58.5, 58.6, 58.4, 58.55, 105986],
  ["2024-03-28T14:10:00+05:30", 58.55, 58.6, 58.5, 58.55, 60042],
  ["2024-03-28T14:15:00+05:30", 58.55, 58.55, 58.45, 58.5, 77794],
  ["2024-03-28T14:20:00+05:30", 58.5, 58.6, 58.4, 58.45, 152012],
  ["2024-03-28T14:25:00+05:30", 58.45, 58.45, 58.35, 58.35, 61053],
  ["2024-03-28T14:30:00+05:30", 58.4, 58.45, 58.3, 58.35, 129134],
  ["2024-03-28T14:35:00+05:30", 58.35, 58.4, 58.25, 58.35, 74624],
  ["2024-03-28T14:40:00+05:30", 58.4, 58.4, 58.3, 58.35, 71652],
  ["2024-03-28T14:45:00+05:30", 58.4, 58.4, 58.25, 58.3, 84876],
  ["2024-03-28T14:50:00+05:30", 58.3, 58.35, 58.25, 58.3, 68962],
  ["2024-03-28T14:55:00+05:30", 58.25, 58.3, 58.1, 58.25, 156536],
  ["2024-03-28T15:00:00+05:30", 58.2, 58.55, 58.2, 58.5, 262622],
  ["2024-03-28T15:05:00+05:30", 58.45, 58.6, 58.45, 58.45, 214494],
  ["2024-03-28T15:10:00+05:30", 58.5, 58.6, 58.4, 58.5, 271441],
  ["2024-03-28T15:15:00+05:30", 58.5, 58.7, 58.45, 58.5, 517412],
  ["2024-03-28T15:20:00+05:30", 58.5, 58.65, 58.3, 58.6, 297693],
  ["2024-03-28T15:25:00+05:30", 58.55, 58.9, 58.55, 58.55, 619352],
];

const markers: SeriesMarker<Time>[] = [
  {
    time: 1711612800 as UTCTimestamp,
    position: "belowBar",
    color: "green",
    shape: "arrowUp",
    text: "buy @100",
    size: 0.5,
  },
  {
    time: 1711618500 as UTCTimestamp,
    position: "aboveBar",
    color: "red",
    shape: "arrowDown",
    text: "sold @100",
    size: 0.5,
  },
];

export default function MainChart() {
  const chartContainerRef = useRef<any>(null);
  const chartRef = useRef<IChartApi>();
  const indicatorRef = useRef<any[]>([]);
  const mainRef = useRef<ISeriesApi<keyof SeriesOptionsMap, Time>>();
  const { chart } = useChart();
  const { currentUserSeries } = useUserSeries();

  const [legendData, setLegendData] = useState<any>({
    open: initialData[0][1],
    high: initialData[0][2],
    low: initialData[0][3],
    close: initialData[0][4],
  });

  useEffect(() => {
    if (!chartContainerRef.current) return;
    const handleResize = () => {
      // chartd.resize();
    };
    let index = 10;
    chartRef.current = createChart(chartContainerRef.current, chart);

    chartRef.current.applyOptions(initialState);

    const data: Data[] = initialData.map((data) => {
      return new Data(
        new Date(data[0]).getTime() / 1000,
        data[1],
        data[2],
        data[3],
        data[4],
        data[5],
      );
    });

    for (const chartStyle of Object.values(currentUserSeries.STYLE)) {
      if (chartStyle.options?.visible) {
        mainRef.current = createSeries(
          chartRef.current,
          chartStyle.type,
          chartStyle.options,
        );
        mainRef.current.setData(data.slice(0, index) as any);
        mainRef.current.setMarkers(markers);
      }
    }

    for (const chartIndicator of Object.values(currentUserSeries.INDICATOR)) {
      indicatorRef.current.push({
        indicator: createIndicator(chartRef.current, chartIndicator.type, {
          data: data.slice(0, index),
          ...chartIndicator.options,
        }),
        options: chartIndicator.options,
        type: chartIndicator.type,
      });
    }

    // Setting the border color for the vertical axis
    chartRef.current.priceScale(PRICE_SCALE.RIGHT).applyOptions({
      borderColor: "pink",
      visible: true,
      invertScale: !true,
      autoScale: !false,
    });

    chartRef.current.subscribeCrosshairMove((param) => {
      if (param.time) {
        const candleData = param.seriesData.values().next().value;
        const color =
          candleData?.open > candleData?.close ? "#ef5350" : "#26a69a";
        setLegendData({
          ...candleData,
          color: color,
        });
      } else {
        if (mainRef.current) {
          const data = mainRef.current.data();
          const candleData: any = data[data.length - 1];
          const color =
            candleData.open > candleData.close ? "#ef5350" : "#26a69a";
          setLegendData({
            ...candleData,
            color: color,
          });
        }
      }
    });

    const intervalID = setInterval(() => {
      if (index >= data.length - 1) {
        clearInterval(intervalID);
        return;
      }
      if (mainRef.current) {
        try {
          mainRef.current?.update(data[index] as any);

          index += 1;
          indicatorRef.current.forEach((series) =>
            updateIndicator(series.indicator, series.type, {
              data: data.slice(0, index),
              ...series.options,
            }),
          );
        } catch (error) {
          console.error("Error updating chart:", error);
          // mainRef.current?.setData(data[index] as any);
        }
      }
    }, 100);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [chart, currentUserSeries]);

  return (
    <div className="h-full">
      <div
        ref={chartContainerRef}
        className={cn("relative h-[calc(100%-2.5rem)]")}
      >
        <div className="absolute left-4 top-4 z-50">
          <div>
            <span> O</span>
            <span style={{ color: legendData?.color }}>
              {legendData?.open?.toFixed(2)}
            </span>
            <span> H</span>
            <span style={{ color: legendData?.color }}>
              {legendData?.high?.toFixed(2)}
            </span>
            <span> L</span>
            <span style={{ color: legendData?.color }}>
              {legendData?.low?.toFixed(2)}
            </span>
            <span> C</span>
            <span style={{ color: legendData?.color }}>
              {legendData?.close?.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
      <div className="h-10 border">Time</div>
    </div>
  );
}
