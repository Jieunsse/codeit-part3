import Button from '@src/components/button/Button';
import ModalButton from '@src/components/button/ModalButton';
import SocialButton from '@src/components/button/SocialButton';
// import { Input } from '@src/components/input/Input';
// import Profile from '@src/components/input/Profile';
// import { Search } from '@src/components/input/Search';
// import Select from '@src/components/input/Select';
// import { useState } from 'react';

export function InputTest() {
  // const [sel, setSel] = useState<string | undefined>();

  return (
    <div style={{ backgroundColor: 'darkgray', width: '100%', height: '100vh' }}>
      <div>Home!!</div>
      {/* <Input className="w-60" title="이메일" type="text" placeholder="입력하세요." />
      <Search className="w-80" placeholder="입력하세요." />

      <Select
        title="이메일"
        options={[
          { label: '1번', value: '1' },
          { label: '2번', value: '2' },
          { label: '3번', value: '3' },
        ]}
        value={sel}
        onChange={(value) => {
          setSel(value);
        }}
        className="w-60"
      />

      <Profile url="https://talkimg.imbc.com/TVianUpload/tvian/TViews/image/2022/01/07/df6a7e74-af77-4f2e-ac05-859b665c5333.jfif" /> */}

      <Button>Hello</Button>
      <br />

      <ModalButton cancel>Hello</ModalButton>
      <br />
      <ModalButton>Hi</ModalButton>
      <br />

      <SocialButton isGoogle>hi</SocialButton>
    </div>
  );
}
