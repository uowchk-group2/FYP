package com.example.hyperledgerapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletResponse;

@SpringBootApplication
@CrossOrigin
public class HyperledgerApiApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(HyperledgerApiApplication.class, args);
    }

    @RequestMapping(value= "/**", method= RequestMethod.OPTIONS)
    public void corsHeaders(HttpServletResponse response) {
        System.out.println("Here");
        response.addHeader("Access-Control-Allow-Origin", "*");
        response.addHeader("Access-Control-Allow-Methods", "GET, POST,OPTIONS");
        response.addHeader("Access-Control-Allow-Headers", "origin, content-type, accept, x-requested-with, Authorization");
        response.addHeader("Access-Control-Max-Age", "3600");

    }

}
