import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import Select from "react-select";
import { getUsers } from "./API/users";
import { getAlbums } from "./API/albums";
import { getPhotos } from "./API/photos";
import { IAlbums, IPhotos, IUsers } from "./types/data";
import "./App.css";

function App() {
  const allAlbums = [
    "album0",
    "album1",
    "album2",
    "album3",
    "album4",
    "album5",
    "album6",
    "album7",
    "album8",
    "album9",
  ];
  const options = [
    { value: "album0", label: "album0" },
    { value: "album1", label: "album1" },
    { value: "album2", label: "album2" },
    { value: "album3", label: "album3" },
    { value: "album4", label: "album4" },
    { value: "album5", label: "album5" },
    { value: "album6", label: "album6" },
    { value: "album7", label: "album7" },
    { value: "album8", label: "album8" },
    { value: "album9", label: "album9" },
  ];

  const [users, setUsers] = useState<IUsers[]>([]);
  const [albums, setAlbums] = useState<IAlbums[]>([]);
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [nivoData, setNivoData] = useState<any>(null);
  const [nivoKeys, setNivoKeys] = useState<string[]>(allAlbums);
  const [nivoOption, setNivoOption] = useState(options);

  async function fetchDataUsers() {
    const res = await getUsers();
    if (res) setUsers(res);
  }

  async function fetchAllAlbums(userID: []) {
    const res = await getAlbums(userID);
    if (res) setAlbums(res);
  }
  async function fetchAllPhotos(albumID: []) {
    const res = await getPhotos(albumID);
    if (res) setPhotos(res);
  }

  useEffect(() => {
    fetchDataUsers();
  }, []);

  useEffect(() => {
    // @ts-ignore
    fetchAllAlbums(users);
  }, [users]);

  useEffect(() => {
    // @ts-ignore
    fetchAllPhotos(albums);
  }, [albums]);

  const outAlbum = (newValue: any) => {
    const newNivoKey = nivoKeys;
    const idxKey = nivoKeys.indexOf(newValue.label);
    newNivoKey.splice(idxKey, 1);
    setNivoKeys(newNivoKey);

    const selectOption = nivoOption.filter((item) => item.label !== newValue.label);
    setNivoOption(selectOption);
  };

  useEffect(() => {
    const nivo = users.map(({ id, email }, idx) => {
      // In each user, get id and filter albums from this id.
      const filteredAlbums: IAlbums[] = albums.filter(
        (album) => album.userId === id
      );

      let albumPhotos = {};

      // For each album filtered, get how many photos and save key "albumX" and value is number of photos
      filteredAlbums.forEach(({ id }, idx) => {
        const filteredPhotos = photos.filter((photo) => photo.albumId === id);

        // @ts-ignore
        albumPhotos[`album${idx}`] = filteredPhotos.length;
        // @ts-ignore
        albumPhotos[`album${idx}Color`] = "hsl(352, 70%, 50%)";
      });

      return { email, ...albumPhotos };
    });
    setNivoData(nivo);
  }, [users, albums, photos]);

  return (
    <div className="App">
      <div className="filteredOUT">
        <label>FILTERED OUT:</label>
        <Select options={nivoOption} onChange={outAlbum} />
      </div>
      <div className="LoadingBox">
        {nivoData === null ? (
          <div className="spinner" />
        ) : (
          <ResponsiveBar
            data={nivoData}
            keys={nivoKeys}
            indexBy="email"
            margin={{ top: 150, right: 150, bottom: 50, left: 100 }}
            padding={0.3}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            colors={{ scheme: "nivo" }}
            defs={[
              {
                id: "dots",
                type: "patternDots",
                background: "inherit",
                color: "#38bcb2",
                size: 4,
                padding: 1,
                stagger: true,
              },
              {
                id: "lines",
                type: "patternLines",
                background: "inherit",
                color: "#eed312",
                rotation: -45,
                lineWidth: 6,
                spacing: 10,
              },
            ]}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "email",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "photos per person",
              legendPosition: "middle",
              legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            role="application"
            ariaLabel="Photos per album in Seven users"
            barAriaLabel={function (e) {
              return (
                e.id + ": " + e.formattedValue + " in albums: " + e.indexValue
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

export default App;
