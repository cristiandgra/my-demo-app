package com.demo.app.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.time.LocalDateTime;

@Schema(description = "Response object for data processing")
public class ProcessResponse {
    
    @Schema(
        description = "Response message indicating success or error",
        example = "Data processed successfully!"
    )
    private String message;
    
    @Schema(
        description = "The processed data",
        example = "HELLO WORLD"
    )
    private String data;
    
    @Schema(
        description = "Timestamp when the processing occurred",
        example = "2024-01-01T12:00:00"
    )
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