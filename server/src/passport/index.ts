import * as passport from "passport";
import local from "./localStrategy";
import naver from "./naverStrategy";
import kakao from "./kakaoStrategy";
import github from "./githubStrategy";
import { Users } from "../db/models/users";

export default () => {
  passport.serializeUser((user, done) => {
    done(null, user.uid);
  });

  passport.deserializeUser((uid, done) => {
    Users.findOne({ where: { uid } })
      .then((user: any) => done(null, user))
      .catch((err) => done(err));
  });
  local();
  naver();
  kakao();
  github();
};
