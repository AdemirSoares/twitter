import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import API_BASE_URL from "../../config/api";
import type { ProfileApiType } from "../../types";

import * as S from "./styles";

function LeftSide() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState<ProfileApiType>();
  const [openMenu, setOpenMenu] = useState(false);

  const ReturnHome = () => {
    navigate("/");
  };

  const GoToProfile = () => {
    if (userInfo && userInfo.userat && userInfo.id) {
      navigate(`/${userInfo.userat}/${userInfo.id}/profile`);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');

      console.log('userId:', userId);
      console.log('token:', token);

      if (!userId || userId === 'NaN' || userId === 'null' || userId === 'undefined' || !token) {
        console.warn('Usuário não autenticado ou ID ausente ou inválido. userId:', userId);
        return;
      }

      try {
        const res = await axios.get(`${API_BASE_URL}/profiles/${userId}/`, {
            headers: {
              Authorization: `Token ${token}`,
            },
          });
          console.log("Profile API response:", res.data);
          setUserInfo(res.data);
        } catch (err) {
          console.log('Erro ao buscar o perfil:', err);
      }
    };

    fetchData();
  }, []);

  const logOut = () => {
    navigate("/register");

    localStorage.removeItem("token");
  };

  return (
    <>
      <S.CloseDiv
        onClick={() => setOpenMenu(false)}
        style={{ display: openMenu ? "block" : "none" }}
      />
      <S.Container>
        <S.Background>
          <S.ButtonsList>
            <div>
              <div onClick={ReturnHome} style={{ position: "relative" }}>
                <S.LogoButton src="/twitter.png" />
                <S.ButtonInteraction />
              </div>
              <S.Wrapper onClick={ReturnHome}>
                <S.ButtonImage src="/house.svg" />
                <S.Button>Home</S.Button>
              </S.Wrapper>
              <S.Wrapper 
                onClick={userInfo ? GoToProfile : undefined} 
                style={{ opacity: userInfo ? 1 : 0.5, pointerEvents: userInfo ? 'auto' : 'none' }}
              >
                <S.ButtonImage src="/profile.svg" />
                <S.Button>Perfil</S.Button>
              </S.Wrapper>
            </div>
            <S.SignOutMenu style={{ display: openMenu ? "flex" : "none" }}>
              <S.SignOutButton onClick={() => logOut()}>
                Sair da conta @{userInfo?.userat}
              </S.SignOutButton>
            </S.SignOutMenu>
            <S.UserInfo onClick={() => setOpenMenu(!openMenu)}>
              <S.ProfilePicture src={userInfo?.profile} />
              <div>
                <S.Username>{userInfo?.username}</S.Username>
                <S.UserAt>@{userInfo?.userat}</S.UserAt>
              </div>
            </S.UserInfo>
          </S.ButtonsList>
        </S.Background>
      </S.Container>
    </>
  );
}

export default LeftSide;