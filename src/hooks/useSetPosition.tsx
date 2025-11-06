import { useEffect, useState } from 'react';

import FEChar from '@/assets/images/ic_char_FE.svg';
import FECharHover from '@/assets/images/ic_char_FE_hover.svg';
import BEChar from '@/assets/images/ic_char_BE.svg';
import BECharHover from '@/assets/images/ic_char_BE_hover.svg';
import DEChar from '@/assets/images/ic_char_DE.svg';
import DECharHover from '@/assets/images/ic_char_DE_hover.svg';
import PMChar from '@/assets/images/ic_char_PM.svg';
import PMCharHover from '@/assets/images/ic_char_PM_hover.svg';
import DefaultIcon from '@/assets/images/ic_default_position.svg';

import DefaultD from '@/assets/images/ic_default_board_D.svg';
import DefaultBE from '@/assets/images/ic_default_board_BE.svg';
import DefaultFE from '@/assets/images/ic_default_board_FE.svg';
import DefaultPM from '@/assets/images/ic_default_board_PM.svg';

interface CharacterData {
  characterImg: string;
  userPart: string;
  isNav?: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}

/**
 * @description 포지션에 따라 캐릭터 이미지, hover 이미지, 파트명을 관리하는 커스텀 훅
 */

const useSetPosition = (position: string, isNav = false): CharacterData => {
  const [characterImg, setCharacterImg] = useState(DefaultIcon);
  const [userPart, setUserPart] = useState('');

  // 초기 이미지 세팅
  useEffect(() => {
    if (!position) return;

    const mapping: Record<
      string,
      { default: string; nav: string; hover: string; part: string }
    > = {
      FE: { default: FEChar, nav: DefaultFE, hover: FECharHover, part: 'FE' },
      BE: { default: BEChar, nav: DefaultBE, hover: BECharHover, part: 'BE' },
      D: { default: DEChar, nav: DefaultD, hover: DECharHover, part: 'D' },
      PM: { default: PMChar, nav: DefaultPM, hover: PMCharHover, part: 'PM' },
    };

    const data = mapping[position];

    if (data) {
      if (isNav) {
        setCharacterImg(data.nav);
      } else {
        setCharacterImg(data.default);
      }

      setUserPart(data.part);
    }
  }, [position]);

  // hover 핸들러
  const handleMouseEnter = () => {
    const hoverMapping: Record<string, string> = {
      FE: FECharHover,
      BE: BECharHover,
      D: DECharHover,
      PM: PMCharHover,
    };
    if (hoverMapping[position]) setCharacterImg(hoverMapping[position]);
  };

  const handleMouseLeave = () => {
    const defaultMapping: Record<string, string> = {
      FE: FEChar,
      BE: BEChar,
      D: DEChar,
      PM: PMChar,
    };
    if (defaultMapping[position]) setCharacterImg(defaultMapping[position]);
  };

  return { characterImg, userPart, handleMouseEnter, handleMouseLeave };
};

export default useSetPosition;
