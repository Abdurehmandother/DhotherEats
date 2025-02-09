import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
export default function Food() {
  const { id } = useParams();
  const [foods, setFoods] = useState(null);

  useEffect(() => {
    console.log("object is mounted");
  });

  console.log('objectasdasdasd asdasd')

  return <div>asdasdasdzxxz</div>;
}
