package com.example.fypbackend.controller.api;

import com.example.fypbackend.entity.User;
import com.example.fypbackend.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/user")
public class UserController {
    private UserServices userServices;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserServices userServices, PasswordEncoder passwordEncoder) {
        this.userServices = userServices;
        this.passwordEncoder = passwordEncoder;
    }

    //Post new user
    @PostMapping("/newUser")
    public String newUser(@RequestBody User user, HttpServletRequest request) {
        String password = "";
        if (user.getId() == 0) {
            password = user.getPassword();
            String encodedPassword = passwordEncoder.encode(password);
            user.setPassword(encodedPassword);
        }

        userServices.save(user);
        return "Done";
    }

    //Get info of current JWT user
    @GetMapping("/currentUser")
    public User getCurrentUser(Principal principal) {
        String username = principal.getName();
        return userServices.findByUsername(username);
    }

    //Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userServices.findAll();
    }

    //Get a single user with username
    @GetMapping("findByUsername/{username}")
    public User findByUsername(@PathVariable String username) {
        User user = userServices.findByUsername(username);
        if (user == null) {
            return new User();
        }
        return user;
    }

    //Get a single user with username
    @GetMapping("findByUserId/{userId}")
    public User findByUserId(@PathVariable int userId) {
        User user = userServices.findByID(userId);
        if (user == null) {
            return new User();
        }
        return user;
    }


    //Check existence of the username
    @GetMapping("exist/{username}")
    public String checkUsernameExist(@PathVariable String username) {
        String result = "false";
        try {
            User user = userServices.findByUsername(username);
            System.out.println(user);
            if (user.getId() == 0) {
                result = "false";
            } else {
                result = "true";
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            result = "false";
        }
        return result;
    }


    //Get a list of users with the role
    @GetMapping("findByRoleName/{role}")
    public List<User> findByRoleName(@PathVariable String role) {
        return userServices.findByRoleName(role);
    }

    @GetMapping("status")
    public User getStatus(Authentication authentication) {
        String username = authentication.getName();

        User user = userServices.findByUsername(username);
        if (user == null) {
            return new User();
        }
        return user;
    }

}
