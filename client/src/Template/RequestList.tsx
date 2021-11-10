/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";
import ProfileCard from "../Atom/ProfileCard";
import ProfileInfo from "../Atom/ProfileInfo";
import { RequestListType } from "../util/type";
import { Button } from "../Atom/Button";

const ProfileListStyle = css`
  margin: 0 auto;
  width: 70%;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 10px;
  height: 100vh;
`;
const ProfileSideStyle = css`
  display: flex;
  height: 60%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-left: 10px;
`;
const ProfileStyle = css`
  display: flex;
  align-items: center;
  margin: 30px 0px;
`;
const StateStyle = css`
  width: 130px;
  height: 100px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #fff;
  cursor: default;
  border: 2px solid #ffcfcf;
`;
function CardButton(type: string) {
  if (type === "ForMe") {
    return (
      <>
        <Button type="small">수락</Button>
        <Button type="small">거절</Button>
      </>
    );
  }
  return <div css={StateStyle}>대기중</div>;
}
export default function RequestList({ datas, person, setOpenModal, type }: RequestListType) {
  const handleModalClick = (e: React.MouseEvent) => {
    const closestElement = (e.target as HTMLElement).closest(".Profile");
    if (!closestElement) return;
    const { id } = (closestElement as HTMLElement).dataset;
    if (id === undefined) {
      setOpenModal(null);
      return;
    }

    setOpenModal((prev: number) => (prev === Number(id) ? null : Number(id)));
  };
  return (
    <div css={ProfileListStyle} onClick={handleModalClick}>
      {datas?.map((data, idx): React.ReactElement | undefined => {
        const sex = person > 1 ? "team" : data.sex;
        return (
          <div css={ProfileStyle} className="Profile" data-id={idx}>
            <ProfileCard type={sex}>
              <ProfileInfo data={data} />
            </ProfileCard>
            <div css={ProfileSideStyle}>{CardButton(type)}</div>
          </div>
        );
      })}
    </div>
  );
}
