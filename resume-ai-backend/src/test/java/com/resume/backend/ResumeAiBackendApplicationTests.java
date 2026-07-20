package com.resume.backend;

import com.resume.backend.service.ResumeService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.IOException;

@SpringBootTest
class ResumeAiBackendApplicationTests {

	@Autowired
	private ResumeService resumeService;

	@Test
	void contextLoads() throws IOException {

	 resumeService.generateResumeResponse("Vivek Singh with the two years of experience in java development placed at xyz pvt ltd at noida sector 62,skills git and git hub, spring boot, react, java script, and 5 years of experience at abc company as head software developer");

	}

}