import React, { useEffect, useState } from "react";
import "./App.css";
import Select from "react-select";
import Graph from "./graph";
import { IAlbums, IPhotos, IUsers } from "./types/data";
import "./App.css";

type DashProps = {
  users: IUsers[];
  photos: IPhotos[];
  albums: IAlbums[];
  allAlbums: string[];
};
type OptionSelection = {
  label: string;
  value: string;
};

//const totalAlbums = Array.from(Object.keys(groupedAlbums), (num) => `album${num}`);

const options: OptionSelection[] = [
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

function DashBoard({ users, photos, albums, allAlbums }: DashProps) {
  const [nivoData, setNivoData] = useState<any>(null);
  const [nivoKeys, setNivoKeys] = useState<string[]>(allAlbums);
  const [nivoOption, setNivoOption] = useState(options);

  const outAlbum = (newValue: any) => {
    const newNivoKey = nivoKeys;
    const idxKey = nivoKeys.indexOf(newValue.label);
    newNivoKey.splice(idxKey, 1);
    setNivoKeys(newNivoKey);

    const selectOption = nivoOption.filter(
      (item) => item.label !== newValue.label
    );
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
    setNivoKeys(allAlbums);
  }, [users, albums, photos, allAlbums]);

  return (
    <>
      <div className="filteredOUT">
        <div>
          <h2>Photos per person</h2>
        </div>
        <div>
          <label>FILTERED OUT:</label>
          <Select options={nivoOption} onChange={outAlbum} />
        </div>
      </div>
      <Graph nivoData={nivoData} nivoKeys={nivoKeys} />
    </>
  );
}

export default DashBoard;
