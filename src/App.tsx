import React, { useEffect, useState } from "react";
import { getUsers } from "./API/users";
import { getAlbums } from "./API/albums";
import { getPhotos } from "./API/photos";
import { IAlbums, IPhotos, IUsers } from "./types/data";
import "./App.css";
import DashBoard from "./components/DashBoard";
import { groupBy } from "./helpers/functions";


function App() {
  const [isLoading, setloading] = useState<boolean>(false);
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
    const timer = setTimeout(() => {
      fetchDataUsers();
      setloading(true);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <DashBoard users={users} photos={photos} albums={albums} allAlbums={maxAlbums} /> : <div className="spinnerBox"><div className="spinner"></div></div>;
}

export default App;
