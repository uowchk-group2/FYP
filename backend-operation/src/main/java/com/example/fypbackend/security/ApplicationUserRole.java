package com.example.fypbackend.security;

import com.google.common.collect.Sets;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Set;
import java.util.stream.Collectors;

import static com.example.fypbackend.security.ApplicationUserPermission.*;

public enum ApplicationUserRole {
    SUPPLIER(Sets.newHashSet(USER_WRITE, USER_READ)),
    DISTRIBUTOR(Sets.newHashSet(USER_WRITE, USER_READ)),
    DRIVER(Sets.newHashSet(USER_WRITE, USER_READ));
//    STUDENT(Sets.newHashSet()),
//    ADMIN(Sets.newHashSet(EMPLOYEE_READ,EMPLOYEE_WRITE,EMPLOYEE_DELETE));

    private final Set<ApplicationUserPermission> permissions;

    ApplicationUserRole(Set<ApplicationUserPermission> permissions) {
        this.permissions = permissions;
    }

    public Set<ApplicationUserPermission> getPermissions() {
        return permissions;
    }

    public Set<SimpleGrantedAuthority> getGrantedAuthorities(){
        Set<SimpleGrantedAuthority> permissions = getPermissions().stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                .collect(Collectors.toSet());
        permissions.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
        return permissions;
    }
}
