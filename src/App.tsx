import React, { useEffect, useState } from "react";
import { getUsers } from "./API/users";
import { getAlbums } from "./API/albums";
import { getPhotos } from "./API/photos";
import { IAlbums, IPhotos, IUsers } from "./types/data";
import "./App.css";
import DashBoard from "./DashBoard";
import { groupBy } from "./helpers/functions";


function App() {
  const [users, setUsers] = useState<IUsers[]>([]);
  const [albums, setAlbums] = useState<IAlbums[]>([]);
  const [photos, setPhotos] = useState<IPhotos[]>([]);
  const [maxAlbums, setMaxAlbums] = useState<string[]>([]);

  async function fetchDataUsers() {
    const u = await getUsers();
    if (u !== null) {
      setUsers(u);
      const a = await getAlbums(u);
      if (a !== null) {
        setAlbums(a);
        const p = await getPhotos(a);
        if (p) setPhotos(p);
      }
      const groupedAlbums: string[] = groupBy(a, "userId");
      const totalAlbums = Array.from(Object.keys(groupedAlbums), (num) => `album${+num - 1}`);
      setMaxAlbums(totalAlbums);
    }
  }

  useEffect(() => {
    fetchDataUsers();
  }, []);

  return <DashBoard users={users} photos={photos} albums={albums} allAlbums={maxAlbums} />;
}

export default App;
