package com.example.fypbackend.service.delivery;

import com.example.fypbackend.dao.delivery.DeliveryStatusDAOService;
import com.example.fypbackend.entity.DeliveryStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
public class DeliveryStatusServicesImpl implements DeliveryStatusServices{

    private DeliveryStatusDAOService deliveryStatusDAOService;

    @Autowired
    public DeliveryStatusServicesImpl(DeliveryStatusDAOService deliveryStatusDAOService) {
        this.deliveryStatusDAOService = deliveryStatusDAOService;
    }

    @Override
    @Transactional
    public void newDeliveryStatus(DeliveryStatus deliveryStatus) {
        deliveryStatusDAOService.newDeliveryStatus(deliveryStatus);
    }

    @Override
    @Transactional
    public void batchNewDeliveryStatus(List<DeliveryStatus> deliveryStatuses) {
        deliveryStatusDAOService.batchNewDeliveryStatus(deliveryStatuses);
    }

    @Override
    @Transactional
    public List<DeliveryStatus> getStatusOfNoteId(int deliveryNoteId) {
        return deliveryStatusDAOService.getStatusOfNoteId(deliveryNoteId);
    }
}
