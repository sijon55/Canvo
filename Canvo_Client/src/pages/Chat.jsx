import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, X, ImageIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";
import { HiOutlineLogout } from "react-icons/hi";
import { SlSettings } from "react-icons/sl";

// Background decorative image (uploaded by you)
const BG_IMAGE =
  "https://shorthand.com/the-craft/types-of-image-file-formats/assets/UPhtO6IIvn/sh-unsplash_4qgbmezb56c-4096x2731.jpeg";

export default function ChatPage() {
  const { user, logout } = useAuth();
  var image = user?.photoURL;
  const [messages, setMessages] = useState(mockMessages());
  const [text, setText] = useState("");
  const [uploading, setUploading] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const listRef = useRef(null);
  const fileInputRef = useRef(null);
  const imgbbKey = import.meta.env.VITE_IMGBB_KEY;

  useEffect(() => {
    // auto-scroll down on new messages
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // ---------- Send text message ----------
  const sendMessage = () => {
    if (!text.trim()) return;
    const msg = makeTextMessage(text);
    setMessages((s) => [...s, msg]);
    setText("");
  };

  // ---------- Handle file selection & upload ----------
  const onFileSelected = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!imgbbKey) {
      toast.error("ImgBB API key not found. Set VITE_IMGBB_KEY.");
      return;
    }

    // show local preview immediately (optimistic)
    const tempUrl = URL.createObjectURL(file);
    const previewMsg = makeImageMessage(tempUrl, { uploading: true });
    setMessages((s) => [...s, previewMsg]);

    // upload to imgbb
    setUploading(true);
    const toastId = toast.loading("Uploading image...");

    try {
      const uploadedUrl = await uploadToImgbb(file, imgbbKey);

      // replace the temp preview message with final image url
      setMessages((prev) => {
        // find the last uploading message (by uploading flag)
        const idx = [...prev]
          .reverse()
          .findIndex((m) => m.meta?.uploading === true);
        if (idx === -1) {
          // fallback: push as new message
          return [...prev, makeImageMessage(uploadedUrl)];
        }
        const realIndex = prev.length - 1 - idx;
        const newArr = [...prev];
        newArr[realIndex] = makeImageMessage(uploadedUrl);
        return newArr;
      });

      toast.success("Image uploaded", { id: toastId });
    } catch (err) {
      console.error("Upload failed:", err);
      // remove the preview uploading message and show error toast
      setMessages((prev) => prev.filter((m) => !(m.meta?.uploading === true)));
      toast.error("Image upload failed", { id: toastId });
    } finally {
      setUploading(false);
      toast.remove(); // remove any leftover loading toasts
      // auto-scroll after upload attempt
      setTimeout(
        () =>
          listRef.current?.scrollTo({
            top: listRef.current.scrollHeight,
            behavior: "smooth",
          }),
        250
      );
    }
  };

  // ---------- UI helpers ----------
  const openFilePicker = () => fileInputRef.current?.click();
  const toggleMobileSheet = () => setMobileSheetOpen((s) => !s);

  return (
    <div className="min-h-screen bg-[#0c0f18] text-white flex justify-center items-center relative overflow-hidden">
      {/* decorative background */}
      <div
        className="absolute inset-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url(${BG_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(4px) saturate(0.6)",
        }}
      />

      <div className="relative  z-10 max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-12 gap-6">
        {/* CENTER - Chat Window (spans mobile full width) */}
        <div className="col-span-12 lg:col-span-8 bg-white/5 rounded-2xl backdrop-blur-md border border-white/10 flex flex-col h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://i.pravatar.cc/150?img=10"
                alt="active"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-lg">Group Chat</div>
                <div className="text-sm text-white/60">
                  Everyone in the group
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Mobile sheet button */}
              <button
                onClick={toggleMobileSheet}
                className="inline-flex lg:hidden items-center gap-2 px-3 py-2 rounded-md bg-white/6"
                aria-label="Open chat info"
              >
                <span className="text-sm cursor-pointer active:rotate-90 transition-all duration-300">
                  <SlSettings />
                </span>
              </button>

              {/* Desktop logout button */}
              <button
                onClick={logout}
                className=" inline-flex cursor-pointer duration-300  px-3 py-2 rounded-md bg-red-600 hover:bg-red-700"
              >
                <HiOutlineLogout />
              </button>
            </div>
          </div>

          {/* Messages container */}
          <div ref={listRef} className="flex-1 overflow-auto p-4 space-y-4">
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} mine={m.from === "me"} />
            ))}
          </div>

          {/* Input / upload controls */}
          <div className="p-4 border-t border-white/10 flex items-center gap-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onFileSelected}
            />

            <button
              type="button"
              onClick={openFilePicker}
              className="p-2 rounded-full bg-white/6 hover:bg-white/8 transition"
              title="Attach image"
              disabled={uploading}
            >
              <Paperclip size={18} />
            </button>

            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-white/10 px-4 py-2 rounded-full outline-none placeholder-white/50"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />

            <button
              onClick={sendMessage}
              disabled={uploading}
              className={`p-3 rounded-full ${
                uploading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#FF6B81] hover:brightness-95"
              } transition`}
              title={uploading ? "Uploading image..." : "Send message"}
            >
              <Send size={18} />
            </button>
          </div>
        </div>

        {/* RIGHT - User Panel (desktop only). On mobile this is hidden. */}
        <aside className="hidden lg:block col-span-4">
          <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-5 h-[86vh] overflow-auto space-y-5">
            <div className="flex items-center gap-3">
              <img
                src={image}
                className="w-16 h-16 rounded-full object-cover"
                alt="profile"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="font-semibold text-lg">{user?.displayName}</div>
                <div className="text-sm text-white/60">
                  This is a group chat for everyone
                </div>
              </div>
            </div>

            <Panel title="Chat Settings">
              <PanelButton>Profile</PanelButton>
              <PanelButton>Change theme</PanelButton>
              <PanelButton> Settings</PanelButton>
            </Panel>

            <Panel title="Privacy & Help">
              <PanelButton>Block</PanelButton>
              <PanelButton>Report</PanelButton>
              <PanelButton>Setting</PanelButton>
            </Panel>

            <Panel title="Shared photos (desktop only)">
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div
                    key={i}
                    className="w-full h-20 rounded-lg overflow-hidden bg-white/10"
                  >
                    <img
                      src={`https://picsum.photos/200/200?random=${i}`}
                      alt={`shared-${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        </aside>
      </div>

      {/* MOBILE: Slide-up bottom sheet for user panel */}
      <MobileBottomSheet
        open={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
      />
    </div>
  );
}

/* -------------------------
   Message utils & components
   ------------------------- */

function makeTextMessage(text) {
  return {
    id: Date.now().toString(),
    from: "me",
    text,
    createdAt: new Date().toISOString(),
    type: "text",
    avatar: null,
    meta: {},
  };
}
function makeImageMessage(url, opts = {}) {
  return {
    id: Date.now().toString() + Math.random().toString(36).slice(2, 6),
    from: "me",
    text: "",
    file: url,
    createdAt: new Date().toISOString(),
    type: "image",
    avatar: null,
    meta: { ...opts },
  };
}

function MessageBubble({ message, mine }) {
  const time = new Date(message.createdAt).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18 }}
      className={`flex ${mine ? "justify-end" : "justify-start"}`}
    >
      {!mine && message.type !== "image" && (
        <img
          src={message.avatar || "https://i.pravatar.cc/100?img=12"}
          className="w-10 h-10 rounded-full object-cover mr-3"
          alt="avatar"
        />
      )}

      <div
        className={`max-w-[44%] p-3 rounded-2xl ${
          mine
            ? "bg-linear-to-br from-[#8b5cf6] to-[#ec4899] text-white rounded-br-none"
            : "bg-white/6 text-white rounded-bl-none"
        }`}
      >
        {message.type === "text" && (
          <div className="whitespace-pre-wrap">{message.text}</div>
        )}

        {message.type === "image" && (
          <div className="space-y-2">
            {/* Safe preview: if uploading meta flag true, show small overlay */}
            <div className="rounded-md overflow-hidden bg-white/3">
              <img
                src={message.file}
                alt="sent"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        )}

        <div className="text-xs text-white/60 mt-2 text-right">{time}</div>
      </div>

      {mine && (
        <img
          src="https://i.pravatar.cc/100?img=15"
          className="w-10 h-10 rounded-full object-cover ml-3"
          alt="me"
        />
      )}
    </motion.div>
  );
}

/* -------------------------
   Mobile Bottom Sheet Component
   ------------------------- */

function MobileBottomSheet({ open, onClose }) {
  const { user } = useAuth();
  const image = user?.photoURL;
  const name = user?.displayName;
  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: open ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={`fixed inset-x-0 bottom-0 z-50 ${
        open ? "" : "pointer-events-none"
      }`}
      style={{ display: open ? "block" : "none" }}
    >
      <div className="max-w-md mx-auto">
        <div className="bg-white/6 backdrop-blur-md rounded-t-2xl border border-white/10 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <img
                src={image}
                className="w-12 h-12 rounded-full object-cover"
                alt="profile"
              />
              <div>
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-white/60">Active members: 12</div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 cursor-pointer hover:bg-red-400/40 duration-300 rounded-md bg-white/6"
            >
              <X size={16} />
            </button>
          </div>

          <div className="space-y-2">
            <button className="w-full text-left py-2 px-3 rounded-lg bg-white/5 hover:bg-white/8">
              Profile
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg bg-white/5 hover:bg-white/8">
              Change theme
            </button>
            <button className="w-full text-left py-2 px-3 rounded-lg bg-white/5 hover:bg-white/8">
              Settings
            </button>
          </div>

          <div className="pt-4 border-t border-white/10">
            <div className="text-sm text-white/70 mb-2">Shared photos</div>

            {/* Shared photos grid */}
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-full h-20 rounded-lg overflow-hidden bg-white/10"
                >
                  <img
                    src={`https://picsum.photos/200/200?random=${i + 10}`}
                    alt={`shared-${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------
   Panel helpers
   ------------------------- */
function Panel({ title, children }) {
  return (
    <div className="bg-white/5 p-3 rounded-xl border border-white/10">
      <h4 className="font-semibold text-sm mb-3 text-white/80">{title}</h4>
      <div className="space-y-2">{children}</div>
    </div>
  );
}
function PanelButton({ children }) {
  return (
    <button className="w-full text-left py-2 px-3 rounded-lg bg-white/5 hover:bg-white/10 transition text-white/80 text-sm">
      {children}
    </button>
  );
}

/* -------------------------
   ImgBB upload helper
   ------------------------- */
async function uploadToImgbb(file, apiKey) {
  // convert file to base64 (without prefix)
  const toBase64 = (f) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result;
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
      reader.readAsDataURL(f);
    });

  const base64 = await toBase64(file);

  const form = new FormData();
  form.append("key", apiKey);
  form.append("image", base64);

  const resp = await fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: form,
  });

  if (!resp.ok) {
    const text = await resp.text();
    throw new Error("ImgBB upload failed: " + text);
  }

  const json = await resp.json();
  return json.data?.url;
}

/* -------------------------
   MOCK messages (for demo)
   ------------------------- */
function mockMessages() {
  return [
    {
      id: "m1",
      from: "them",
      text: "How do you like the new Messenger design? 😁",
      createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      type: "text",
    },
    {
      id: "m2",
      from: "me",
      text: "I love it tbh! 💜",
      createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
      type: "text",
    },
    {
      id: "m3",
      from: "them",
      text: "Big fan of glassmorphism.",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      type: "text",
    },
  ];
}
