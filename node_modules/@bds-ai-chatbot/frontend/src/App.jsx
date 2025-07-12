import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Flex,
  Input,
  Button,
  VStack,
  Text,
  Avatar,
  useColorModeValue,
  Spinner,
} from "@chakra-ui/react";
import axios from "axios";

const USER_AVATAR = "https://ui-avatars.com/api/?name=User";
const BOT_AVATAR = "https://ui-avatars.com/api/?name=AI";

function Message({ message }) {
  const isUser = message.role === "user";
  return (
    <Flex align="start" mb={4} flexDirection={isUser ? "row-reverse" : "row"}>
      <Avatar src={isUser ? USER_AVATAR : BOT_AVATAR} size="sm" mr={isUser ? 0 : 2} ml={isUser ? 2 : 0} />
      <Box
        bg={isUser ? useColorModeValue("blue.100", "blue.700") : useColorModeValue("gray.100", "gray.700")}
        color={useColorModeValue("gray.800", "white")}
        px={4}
        py={2}
        borderRadius="lg"
        maxW="70%"
        boxShadow="md"
      >
        <Text whiteSpace="pre-line">{message.content}</Text>
      </Box>
    </Flex>
  );
}

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Xin chào! Tôi có thể giúp gì cho bạn hôm nay?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages((msgs) => [...msgs, userMessage]);
    setInput("");
    setLoading(true);
    try {
      const res = await axios.post("/api/chat", { user_message: input });
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: res.data.answer || "(Không có phản hồi từ AI)" },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "assistant", content: "Đã xảy ra lỗi khi truy vấn AI." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Flex direction="column" h="100vh" bg={useColorModeValue("gray.50", "gray.900")}> 
      <Box flex={1} overflowY="auto" px={2} py={4}>
        <VStack align="stretch" spacing={0}>
          {messages.map((msg, idx) => (
            <Message key={idx} message={msg} />
          ))}
          <div ref={messagesEndRef} />
        </VStack>
      </Box>
      <Box px={4} py={3} bg={useColorModeValue("white", "gray.800")}
        boxShadow="0 -2px 8px rgba(0,0,0,0.04)">
        <Flex as="form" onSubmit={e => { e.preventDefault(); handleSend(); }}>
          <Input
            placeholder="Nhập câu hỏi..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            mr={2}
            autoFocus
            disabled={loading}
          />
          <Button colorScheme="blue" onClick={handleSend} isLoading={loading} disabled={loading || !input.trim()}>
            Gửi
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
}