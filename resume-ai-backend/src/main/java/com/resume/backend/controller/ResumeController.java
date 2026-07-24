package com.resume.backend.controller;


import com.resume.backend.ResumeRequest;
import com.resume.backend.service.ResumeService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Map;


@RestController
@RequestMapping("/api/v1/resume")
@CrossOrigin("*")
public class ResumeController {

    @GetMapping("/test")
    public String test() {
        return "Backend Working";
    }



   private ResumeService resumeService;

   public ResumeController(ResumeService resumeService) {
       this.resumeService = resumeService;
   }

   @PostMapping("/generate")
    public  ResponseEntity<Map<String, Object>> generateResumeData(
            @RequestBody ResumeRequest resumeRequest
   ) throws IOException {

    Map<String,Object> stringObjectMap = resumeService.generateResumeResponse(resumeRequest.userDescription());
       return new ResponseEntity<>(stringObjectMap, HttpStatus.OK);
   }

}
