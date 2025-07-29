package com.demo.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ProcessRequest {
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