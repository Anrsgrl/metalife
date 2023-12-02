import {
  MdCode,
  MdFormatItalic,
  MdOutlineFormatBold,
  MdOutlineSubtitles,
  MdTitle,
} from "react-icons/md";
import { BsCodeSquare, BsParagraph } from "react-icons/bs";
import { LuListPlus, LuListTree } from "react-icons/lu";

export const editItems = [
  { icon: <MdTitle />, text: "Başlıq", tag: "h3", class: "py-2" },
  { icon: <MdOutlineSubtitles />, text: "Altbaşlıq", tag: "h5", class: "py-2" },
  { icon: <BsParagraph />, text: "Abzas", tag: "p" },
  { icon: <MdOutlineFormatBold />, text: "Tünd yazı", tag: "strong" },
  { icon: <MdFormatItalic />, text: "İtalic yazı", tag: "i" },
  { icon: <MdCode />, text: "Kod", tag: "code" },
  { icon: <BsCodeSquare />, text: "Kod arxaplanlı", tag: "pre" },
  { icon: <LuListTree />, text: "Nöqtəli list", tag: "ul" },
  { icon: <LuListPlus />, text: "List elementi", tag: "li" },
];
