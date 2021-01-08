// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

// ステートのテスト
// /Users/saito_misaki/project/crowd_agent/__tests__/react_components/shared/hooks/useJobRadioToggler.spec.ts

// ボタンクリックしたらフォームのinput出てくるよねっていうテスト

// yarn testで実行

// 先にhookのテストを書くのが良いかも

// import axios from "axios";
// import getReviewList from "../src/App";

import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";
import Apps from "./App";
import ModalWindow from "./components/ModalWindow";

afterEach(cleanup);

it("displays the register", () => {
  const { getByTestId } = render(<Apps />);
  expect(getByTestId("register")).toHaveTextContent("Register");
});

// これでエラーなる
// it("shows modal form", () => {
//   const { getByText } = render(<Apps />);
//   fireEvent.click(getByText("Register"));
//   act(() => {
//     ReactDOM.render(<ModalWindow />, container);
//   });
//   // expect(getByText("submit")).toBeTruthy();
// });

// describe("getReviewList test", () => {
//   let httpRequestGetMock = jest.SpyInstance;

//   beforeEach(() => {
//     httpRequestGetMock = jest.spyOn(axios, "get");
//     httpRequestGetMock.mockResolvedValue({ data: { message: "hello!!" } });
//   });

//   it("axios return mock value", async () => {
//     const res = await getReviewList();
//     // expect(res.message).toBe('Mock response!!!');
//     expect(res.message).toBe("hello!!");
//     // expect(httpRequestGetMock).toHaveBeenCalledWith('http://localhost:5678');
//   });
// });

// it('mockで意図したURLに通信を送り、返ってくるはずのものを確認するテスト', async () => {
//   const res = await getRequest();
//   expect(res.message).toBe('hello!!');
//   expect(httpRequestGetMock).toHaveBeenCalledWith('http://localhost:5678');
// });
