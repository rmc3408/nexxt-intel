import React, { useEffect, useState } from "react";
import Select from "react-select";
import Graph from "./graph";
import { IAlbums, IPhotos, IUsers } from "../types/data";

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


function DashBoard({ users, photos, albums, allAlbums }: DashProps) {
  const optionsAlbums = Array.from(allAlbums, (num) => ({ value: num, label: num }));
  const [nivoData, setNivoData] = useState<any>(null);
  const [nivoKeys, setNivoKeys] = useState<string[]>(allAlbums);
  const [nivoOption, setNivoOption] = useState<OptionSelection[]>(optionsAlbums);

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
    setNivoOption(optionsAlbums);
  }, [users, albums, photos, allAlbums, optionsAlbums]);

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
