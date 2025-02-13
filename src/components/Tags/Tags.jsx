import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Tags({ setFood }) {
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    async function fetchTags() {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/foods/tags"
        );
        setTags([...new Set(data.map((tag) => tag.name))]); // for avoiding duplications of data
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    }
    fetchTags();
  }, []);

  const onClick = async (tag) => {
    if (tag === selectedTag) return;
    setSelectedTag(tag);

    try {
      const { data } =
        tag === "All"
          ? await axios.get("http://localhost:5000/api/foods")
          : await axios.get(`http://localhost:5000/api/foods/tag/${tag}`);

      setFood(data);
    } catch (error) {
      console.error("Error fetching foods by tag:", error);
    }
  };

  return (
    <div className="d-flex gap-3 justify-content-center">
      {tags.map((tag, index) => (
        <button
          key={index}
          className={`btn ${
            selectedTag === tag ? "btn-primary" : "btn-secondary"
          }`}
          onClick={() => onClick(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
