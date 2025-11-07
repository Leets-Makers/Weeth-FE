import { useEffect, useState } from 'react';

import DefaultIcon from '@/assets/images/ic_default_position.svg';

import DefaultD from '@/assets/images/ic_default_board_D.svg';
import DefaultBE from '@/assets/images/ic_default_board_BE.svg';
import DefaultFE from '@/assets/images/ic_default_board_FE.svg';
import DefaultPM from '@/assets/images/ic_default_board_PM.svg';

interface CharacterData {
  characterImg: string;
  userPart: string;
}

/**
 * @description 포지션에 따라 캐릭터 이미지, hover 이미지, 파트명을 관리하는 커스텀 훅
 */

const useSetPosition = (position: string): CharacterData => {
  const [characterImg, setCharacterImg] = useState(DefaultIcon);
  const [userPart, setUserPart] = useState('');

  // 초기 이미지 세팅
  useEffect(() => {
    if (!position) return;

    const mapping: Record<string, { nav: string; part: string }> = {
      FE: { nav: DefaultFE, part: 'FE' },
      BE: { nav: DefaultBE, part: 'BE' },
      D: { nav: DefaultD, part: 'D' },
      PM: { nav: DefaultPM, part: 'PM' },
    };

    const data = mapping[position];

    if (data) {
      setCharacterImg(data.nav);

      setUserPart(data.part);
    }
  }, [position]);

  return { characterImg, userPart };
};

export default useSetPosition;
