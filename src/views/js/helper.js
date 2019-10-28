define([], function () {
    var addOrRemoveClass2SelectorForEvent = function (selectorId, method, classname) {
        document.getElementById(selectorId).addEventListener(method, function (event) {
            this.classList.remove(classname);
        })
    };

    var partnerTemplate = function () {
        return  `
                  <div class="modal" id="partnerModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                      
                        <div class="modal-header">
                          <h4 class="modal-title">Information</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <div class="modal-body">
                            Please contact our partner department at 902-111-1111
                        </div>
                        
                        <div class="modal-footer">
                            <div class="float-right">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" id="modalClose">Close</button>
                            </div>  
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
  `
    }

    var deliverTemplate = function () {
        return  `
                  <div class="modal" id="deliverModal">
                    <div class="modal-dialog">
                      <div class="modal-content">
                      
                        <div class="modal-header">
                          <h4 class="modal-title">Information</h4>
                          <button type="button" class="close" data-dismiss="modal">&times;</button>
                        </div>
                        
                        <div class="modal-body">
                        Please contact our deliver department at 902-111-1111
                        </div>
                        <div class="modal-footer">
                            <div class="float-right">
                                <button type="button" class="btn btn-danger" data-dismiss="modal" id="modalClose">Close</button>
                            </div>  
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  
  `
    }
    return {addOrRemoveClass2SelectorForEvent, deliverTemplate, partnerTemplate}

});