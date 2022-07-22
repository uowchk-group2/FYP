package com.example.fypbackend.auth;

import com.google.common.collect.Lists;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static com.example.fypbackend.security.ApplicationUserRole.*;

@Repository("fake")
public class FakeUserRepository implements ApplicationUserDao{

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public FakeUserRepository(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public Optional<ApplicationUser> selectApplicationUserByUsername(String username) {
        return getApplicationUsers()
                .stream()
                .filter(applicationUser -> username.equals(applicationUser.getUsername()))
                .findFirst();
    }

    private List<ApplicationUser> getApplicationUsers(){
        List<ApplicationUser> applicationUsers = Lists.newArrayList(
                new ApplicationUser(
                        "johnny",
                        passwordEncoder.encode("johnny"),
                        DISTRIBUTOR.getGrantedAuthorities(),
                        true,
                        true,
                        true,
                        true
                )
        );

        return applicationUsers;
    }
}
