package com.demo.app.dto;

import java.time.LocalDateTime;

public class ProcessResponse {
    private String message;
    private String data;
    private String timestamp;

    public ProcessResponse() {}

    public ProcessResponse(String message, String data) {
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now().toString();
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}