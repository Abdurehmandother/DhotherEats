import React from "react";
import { sample_foods } from "../../Data";

export default function Tags({ foods, setFood }) {
  let tagName = ["All"];
  sample_foods.map((food) => {
    food.tags.filter((tag) => {
      tagName.push(tag);
    });
  });

  const set = new Set(tagName);
  tagName = Array.from(set);

  const onClick = (e) => {
    foods = sample_foods;

    let value = e.target.textContent;
    let filterTags;

    if (value == "All") {
      setFood(sample_foods);
    } else {
      filterTags = foods.filter((food) => {
        return food.tags.includes(value);
      });
      console.log(filterTags.length);
      setFood(filterTags);
    }
  };

  return (
    <div className="d-flex gap-3 justify-content-center">
      {tagName.map((tag) => {
        return (
          <li key={tag} className="btn btn-primary" onClick={onClick}>
            {tag}
          </li>
        );
      })}
    </div>
  );
}
