package com.example.fypbackend.service.delivery;

import com.example.fypbackend.dao.delivery.DeliveryNoteDAOService;
import com.example.fypbackend.entity.DeliveryNote;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class DeliveryNoteServicesImpl implements DeliveryNoteServices{

    private DeliveryNoteDAOService deliveryNoteDAOService;

    @Autowired
    public DeliveryNoteServicesImpl(DeliveryNoteDAOService deliveryNoteDAOService) {
        this.deliveryNoteDAOService = deliveryNoteDAOService;
    }

    @Override
    @Transactional
    public void newDeliveryNote(DeliveryNote deliveryNote) {
        deliveryNoteDAOService.newDeliveryNote(deliveryNote);
    }

    @Override
    @Transactional
    public DeliveryNote findByDeliveryNoteId(int deliveryNoteId) {
        return deliveryNoteDAOService.findByDeliveryNoteId(deliveryNoteId);
    }

    @Override
    @Transactional
    public List<DeliveryNote> findByOrderId(int orderId) {
        return deliveryNoteDAOService.findByOrderId(orderId);
    }

    @Override
    @Transactional
    public List<DeliveryNote> findByDriverId(int driverId) {
        return deliveryNoteDAOService.findByDriverId(driverId);
    }
}
