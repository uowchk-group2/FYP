package com.example.fypbackend.service;

import com.example.fypbackend.dao.DocDAOService;
import com.example.fypbackend.entity.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class DocServicesImpl implements DocServices{

    private DocDAOService docDAOService;

    @Autowired
    public DocServicesImpl(DocDAOService docDAOService) {
        this.docDAOService = docDAOService;
    }

    @Override
    @Transactional
    public void newDoc(Document document) {
        docDAOService.newDoc(document);
    }

    @Override
    @Transactional
    public List<Document> findByOrderId(int orderId) {
        return docDAOService.findByOrderId(orderId);
    }

    @Override
    @Transactional
    public List<Document> findByNoteId(int noteId) {
        return docDAOService.findByNoteId(noteId);
    }
}
