import React from "react";
import { IPerson } from "../PeopleTable";

export const PersonDetail: React.FC<{ person: null | IPerson }> = ({ person }) => {
  if (!person) return <></>;
  const { name, birth_year, height, mass, hair_color, skin_color, eye_color, gender, homeworld, films, species, vehicles, starships, created, edited, url } = person;

  return (
    <div>
      <p>Name: {name}</p>
      <p>Birth Year: {birth_year}</p>
      <p>Height: {height}</p>
      <p>Mass: {mass}</p>
      <p>Hair Color: {hair_color}</p>
      <p>Skin Color: {skin_color}</p>
      <p>Eye Color: {eye_color}</p>
      <p>Gender: {gender}</p>
      <p>Homeworld: {homeworld}</p>
      <p>Films: {films.join(", ")}</p>
      <p>Species: {species.join(", ")}</p>
      <p>Vehicles: {vehicles.join(", ")}</p>
      <p>Starships: {starships.join(", ")}</p>
      <p>Created: {created}</p>
      <p>Edited: {edited}</p>
      <p>URL: {url}</p>
    </div>
  );
};
