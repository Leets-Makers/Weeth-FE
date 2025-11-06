import { useEffect, useState } from 'react';

import FEChar from '@/assets/images/ic_char_FE.svg';
import BEChar from '@/assets/images/ic_char_BE.svg';
import DEChar from '@/assets/images/ic_char_DE.svg';
import PMChar from '@/assets/images/ic_char_PM.svg';
import DefaultIcon from '@/assets/images/ic_default_position.svg';

import DefaultD from '@/assets/images/ic_default_board_D.svg';
import DefaultBE from '@/assets/images/ic_default_board_BE.svg';
import DefaultFE from '@/assets/images/ic_default_board_FE.svg';
import DefaultPM from '@/assets/images/ic_default_board_PM.svg';

interface CharacterData {
  characterImg: string;
  userPart: string;
  isNav?: boolean;
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
      { default: string; nav: string; part: string }
    > = {
      FE: { default: FEChar, nav: DefaultFE, part: 'FE' },
      BE: { default: BEChar, nav: DefaultBE, part: 'BE' },
      D: { default: DEChar, nav: DefaultD, part: 'D' },
      PM: { default: PMChar, nav: DefaultPM, part: 'PM' },
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

  return { characterImg, userPart };
};

export default useSetPosition;
