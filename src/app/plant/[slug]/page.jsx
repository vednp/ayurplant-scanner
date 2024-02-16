"use client";
import { React, useEffect, useState } from "react";
import data from "../../../data";
import Image from "next/image";

const BotanicalInfoPage = ({ params }) => {
  const [ttsTriggered, setTTSTriggered] = useState(false);
  const [imageSrc, setImageSrc] = useState(null); 

  const botanicalInfo = data.find((item) => item.id === params.slug);

  if (!botanicalInfo) {
    return <div>Botanical information not found for {params.slug}</div>;
  }

  const speakText = (text, speed = 1.0) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const {
    id,
    botanicalName,
    imageName,
    family,
    synonyms,
    classicalCategorization,
    usefulPart,
    indications,
    shloka,
  } = botanicalInfo;

  useEffect(() => {
    if (!ttsTriggered) {
      speakText(
        `Botanical name ${botanicalName}; Family ${family}; Synonyms ${synonyms?.join(
          ", "
        )}; Classical Categorization ${classicalCategorization?.join(
          ", "
        )}; Useful Part ${usefulPart}; Indications ${indications?.join(", ")};`,
        0.5
      );
      setTTSTriggered(true);
    }

    if (imageName) {
      import(`../../../../public/plant-images/${imageName}/${imageName}.png`).then((image) => {
        setImageSrc(image.default);
      });
    }
  }, [ttsTriggered, imageName]); 

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="flex">
        <Image
          src={"/volume-up.png"}
          height={2}
          width={2}
          onClick={() =>
            speakText(
              `Botanical name ${botanicalName}; Family ${family}; Synonyms ${synonyms?.join(
                ", "
              )}; Classical Categorization ${classicalCategorization?.join(
                ", "
              )}; Useful Part ${usefulPart}; Indications ${indications?.join(
                ", "
              )};`,
              0.5
            )
          }
          className="bg-blue-300 hover:bg-blue-400 text-white h-5 w-5 mt-2 mr-2 rounded"
        />

        <h1 className="text-3xl font-bold mb-4">{botanicalName}</h1>
      </div>
      {imageSrc && ( 
        <Image
          className="p-10"
          src={imageSrc} 
          height={300}
          width={300}
          alt={`Image of ${botanicalName}`}
        />
      )}
      <div>
        <p>
          <span className="font-semibold">Family:</span> {family}
        </p>
        <p>
          <span className="font-semibold">Synonyms:</span>{" "}
          {synonyms?.join(", ")}
        </p>
        <p>
          <span className="font-semibold">Classical Categorization:</span>{" "}
          {classicalCategorization?.join(", ")}
        </p>
        <p>
          <span className="font-semibold">Useful Part:</span> {usefulPart}
        </p>
        <p>
          <span className="font-semibold">Indications:</span>{" "}
          {indications?.join(", ")}
        </p>
        <div>
          <span>
            <span
              onClick={() =>
                speakText(
                  `Botanical name ${botanicalName}; Family ${family}; Synonyms ${synonyms?.join(
                    ", "
                  )}; Classical Categorization ${classicalCategorization?.join(
                    ", "
                  )}; Useful Part ${usefulPart}; Indications ${indications?.join(
                    ", "
                  )};`,
                  0.5
                )
              }
              className="bg-blue-500 hover:bg-blue-700 text-white h-5 w-5 rounded"
            ></span>
          </span>
          <div className="font-semibold py-3">Shloka:</div>
          <ul>
            {shloka?.map((line, index) => (
              <li key={index}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BotanicalInfoPage;
