package com.example.fypbackend.auth;

import com.example.fypbackend.entity.User;
import com.example.fypbackend.service.UserServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

import static com.example.fypbackend.security.ApplicationUserRole.*;

@Repository("db")
public class UserRepository implements ApplicationUserDao {

    private final PasswordEncoder passwordEncoder;

    private final UserServices userServices;

    @Autowired
    public UserRepository(PasswordEncoder passwordEncoder, UserServices userServices) {
        this.passwordEncoder = passwordEncoder;
        this.userServices = userServices;
    }

    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        User user = userServices.findByUsername(username);
        System.out.println("User found: " + user);
        Set<SimpleGrantedAuthority> grantedAuthorities = null;
        String userRole = user.getRole();
        System.out.println("Role: "+userRole);
        if (userRole == null){
            System.out.println("User not found. Returned");
            Optional<ApplicationUser> result = Optional.empty();
            return result;
        }
        switch (userRole){
            case "ROLE_SUPPLIER":
                grantedAuthorities = SUPPLIER.getGrantedAuthorities();
                break;
            case "ROLE_DISTRIBUTOR":
                grantedAuthorities = DISTRIBUTOR.getGrantedAuthorities();
                break;
            case "ROLE_DRIVER":
                grantedAuthorities = DRIVER.getGrantedAuthorities();
                break;

        }
        Optional<ApplicationUser> applicationUser = Optional.of(new ApplicationUser(
                user.getUsername(),
                user.getPassword(),
                grantedAuthorities,
                true,
                true,
                true,
                true
        ));

        return applicationUser;
    }

}
