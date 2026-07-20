package com.resume.backend.service;

import org.json.JSONObject;

import java.io.IOException;
import java.util.Map;

public interface ResumeService {
    // this argument is taking the description for the resume and then it is generating the responses for the user

    Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException;

}