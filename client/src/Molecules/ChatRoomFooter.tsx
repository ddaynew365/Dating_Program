/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { css } from "@emotion/react";
import VideoSupport from "./VideoSupport";
import { Button } from "../Atom/Button";
import { getGameDatas, getGatherCharacter } from "../util/constant";
import LargeModal from "../Organism/LargeModal";
import LinkButton from "./LinkButton";
import useDropDownCloseEvent from "../Hook/useDropDownCloseEvent";

const footerStyle = css`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 50px;
  position: absolute;
  bottom: 10%;
  right: 5%;
`;

const CharacterStyle = (props: { index: number }) => css`
  background-image: url(/character/캐릭터${props.index + 1}.png);
  width: 32px;
  height: 32px;
  margin: auto;
`;

export default function ChatRoomFooter() {
  const [openGame, setOpenGame] = useState<boolean>(false);
  const [openGather, setOpenGather] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const [datas, setDatas] = useState<String[] | null>(null);

  const searchParams = new URLSearchParams(useLocation().search);
  const chatRoomID = Number(searchParams.get("chatRoomId"));

  const gameURL = `/ChatRoom/Game?chatRoomId=${chatRoomID}`;
  const gatherURL = `/ChatRoom/Gather?chatRoomId=${chatRoomID}`;

  const handleGameButtonClick = () => {
    setOpenGather(false);
    setIndex(0);
    setDatas(getGameDatas());
    setOpenGame(true);
  };

  const handleGatherButtonClick = () => {
    setOpenGame(false);
    setIndex(0);
    setDatas(getGatherCharacter());
    setOpenGather(true);
  };

  const handleCloseButtonClick = () => {
    setOpenGame(false);
    setOpenGather(false);
    setIndex(0);
  };
  const inCreaseIndex = (): void => {
    setIndex((prev) => prev + 1);
  };

  const decreaseIndex = (): void => {
    setIndex((prev) => prev - 1);
  };

  const modalGameRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(modalGameRef, () => setOpenGame(false));

  const modalGatherRef = useRef<HTMLDivElement>(null);
  useDropDownCloseEvent(modalGatherRef, () => setOpenGather(false));

  return (
    <div css={footerStyle}>
      <VideoSupport type="basic" />

      <div style={{ display: "flex" }}>
        <div ref={modalGameRef}>
          <Button type="Small" onClick={handleGameButtonClick}>
            게임하기
          </Button>
          {openGame && (
            <LargeModal index={index} length={datas?.length ?? 0} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
              <div>게임{index}</div>
              <LinkButton url={gameURL} type="Large" onClick={handleCloseButtonClick} content="게임 시작하기" />
            </LargeModal>
          )}
        </div>

        <div ref={modalGatherRef}>
          <Button type="Small" onClick={handleGatherButtonClick}>
            게더타운
          </Button>
          {openGather && (
            <LargeModal index={index} length={datas?.length ?? 0} inCreaseIndex={inCreaseIndex} decreaseIndex={decreaseIndex}>
              <div css={CharacterStyle({ index })} />
              <LinkButton url={gatherURL} type="Large" onClick={handleCloseButtonClick} content="게임 시작하기" />
            </LargeModal>
          )}
        </div>
      </div>
    </div>
  );
}