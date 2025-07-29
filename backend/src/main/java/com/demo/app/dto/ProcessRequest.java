package com.demo.app.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Request object for data processing")
public class ProcessRequest {
    
    @Schema(
        description = "The data to be processed",
        example = "hello world",
        maxLength = 1000
    )
    @NotBlank(message = "Data cannot be empty")
    @Size(max = 1000, message = "Data cannot exceed 1000 characters")
    private String data;

    public ProcessRequest() {}

    public ProcessRequest(String data) {
        this.data = data;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }
}