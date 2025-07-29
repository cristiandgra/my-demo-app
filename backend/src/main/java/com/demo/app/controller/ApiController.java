package com.demo.app.controller;

import com.demo.app.dto.ProcessRequest;
import com.demo.app.dto.ProcessResponse;
import com.demo.app.service.DataProcessingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend to connect
public class ApiController {

    private final DataProcessingService dataProcessingService;

    @Autowired
    public ApiController(DataProcessingService dataProcessingService) {
        this.dataProcessingService = dataProcessingService;
    }

    @PostMapping("/process")
    public ResponseEntity<ProcessResponse> processData(@Valid @RequestBody ProcessRequest request) {
        try {
            String processedData = dataProcessingService.processData(request.getData());
            ProcessResponse response = new ProcessResponse(
                "Data processed successfully!",
                processedData
            );
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            ProcessResponse errorResponse = new ProcessResponse(
                "Error: " + e.getMessage(),
                request.getData()
            );
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            ProcessResponse errorResponse = new ProcessResponse(
                "Internal server error occurred",
                request.getData()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok("Backend is running!");
    }
}