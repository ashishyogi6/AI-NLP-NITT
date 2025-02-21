import React, { useEffect, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/plugins/counter.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import imageList from "../../public/images_data.js";

const Gallery = () => {
  const [filteredImageList, setFilteredImageList] = useState(imageList);
  const [filters, setFilters] = useState([]);  
  const [open, setOpen] = React.useState(false); //To open lightbox
  const [startIndex,setStartIndex] =useState(0); //needed to start the lightbox with clicked image
  const [activeFilter,setActiveFilter]=useState("All");

  useEffect(() => {
    const tags = [];
    tags.push("All");
    imageList.forEach((item) => {
      if (!tags.includes(item.tag)) tags.push(item.tag);
    });
    setFilters(tags);
  }, []);

  const filterImages = (newTag) => {
    const temp = imageList.filter(
      (item) => item.tag === newTag || newTag == "All"
    );
    setFilteredImageList(temp);
  };

  return (
    <div className="w-[min(1100px,100%)] m-auto">
      
      {/* Filters List  */}
      <div className=" m-8 flex flex-row gap-y-3 gap-x-4 justify-center flex-wrap">
        {filters.map((filter, index) => (
          <Tag key={index} filter={filter} filterImages={filterImages} activeFilter={activeFilter} setActiveFilter={setActiveFilter}/>
        ))}
      </div>
      
      {/* Image Gallery */}
      <div className="m-8 grid grid-cols-2 md:grid-cols-3 gap-4">
        {filteredImageList.map((item, index) => {
          return (
            <div key={index} className="cursor-pointer">
              <img
                className="h-auto max-w-full rounded-lg"
                src={item.path}
                alt={`Image ${index}`}
                onClick={() => {
                  setOpen(true);
                  setStartIndex(index);
                }}
              />
            </div>
          );
        })}
      </div>

      <Lightbox
        open={open}
        index={startIndex}
        close={() => setOpen(false)}
        plugins={[Counter, Zoom]}
        counter={{ container: { style: { bottom: "unset", top: 0 } } }}
        slides={filteredImageList.map((item) => ({ src: item.path }))}
      />
    </div>
  );
};

//Tag OR Filters
const Tag = ({ filter, filterImages,activeFilter,setActiveFilter }) => {
  return (
    <div
     className={filter==activeFilter ? "bg-blue-800 text-white rounded-md p-2 cursor-pointer" : "bg-gray-800 text-white rounded-md p-2 cursor-pointer"}
      onClick={() => 
        {
          filterImages(filter);
          setActiveFilter(filter);
        }
        }
    >
      {filter}
    </div>
  );
};

export default Gallery;
