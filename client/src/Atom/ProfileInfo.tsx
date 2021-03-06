/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import { ProfileInfoDataType } from "../util/type";
import ProfileImage from "./ProfileImage";

const ContainerStyle = css`
  height: 100%;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const InfoStyle = css`
  & div {
    margin: 10px 0;
  }
`;
export default function ProfileInfo({ data }: ProfileInfoDataType): JSX.Element {
  const { id, image, location, sex, age, info, member } = data;

  let infoSex = sex;
  let infoAge: number = age ?? 0;
  if (member) {
    infoSex = member[0].sex;
    member.forEach((element) => {
      infoAge += element.age;
    });
    infoAge /= member.length;
  }
  infoSex = infoSex === "female" ? "여성" : "남성";
  return (
    <div css={ContainerStyle}>
      <ProfileImage type="Small" image={String(image)} />
      <div css={InfoStyle}>
        <div>제목 : {id}</div>
        <div>지역 : {location}</div>
        <div>성별 : {infoSex}</div>
        <div>나이 : {infoAge}</div>
        <div>소개 : {info}</div>
      </div>
    </div>
  );
}
