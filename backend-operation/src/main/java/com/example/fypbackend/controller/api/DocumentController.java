package com.example.fypbackend.controller.api;

import com.example.fypbackend.entity.Document;
import com.example.fypbackend.service.DocServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doc")
public class DocumentController {

    private DocServices docServices;

    @Autowired
    public DocumentController(DocServices docServices) {
        this.docServices = docServices;
    }

    @PostMapping("/newDoc")
    public Document newDocument(@RequestBody Document document){
        docServices.newDoc(document);
        return document;
    }

    @GetMapping("/byOrderId/{orderId}")
    public List<Document> findByOrderId(@PathVariable int orderId){
        return docServices.findByOrderId(orderId);
    }

    @GetMapping("/byNoteId/{noteId}")
    public List<Document> findByNoteId(@PathVariable int noteId){
        return docServices.findByNoteId(noteId);
    }
}
