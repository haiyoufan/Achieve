﻿//验证表单
function formValid(index) {
    return $(index).valid({
        errorPlacement: function (error, element) {
            element.parents('.formValue').addClass('has-error');
            element.parents('.has-error').find('i.error').remove();
            element.parents('.has-error').append('<i class="form-control-feedback fa fa-exclamation-circle error" data-placement="left" data-toggle="tooltip" title="' + error + '"></i>');
            $(index).find("[data-toggle='tooltip']").tooltip();
            if (element.parents('.input-group').hasClass('input-group')) {
                element.parents('.has-error').find('i.error').css('right', '33px')
            }
            
        },
        success: function (element) {
            element.parents('.has-error').find('i.error').remove();
            element.parent().removeClass('has-error');
        }
    });
}
//新增方法
//table:表格id
//id:编号
//title:标题
//url:地址
//width:宽
//height:高
function btn_add(table, id, title, url,suburl, width, height) {
    $.modalOpen({
        id: id,
        title: title,
        url: url,
        width: width + "px",
        height: height + "px",
        callBack: function (iframeId,index) {
            if (!formValid($(top.frames[iframeId].document).find('form'))) {
                return false;
            }
            $.submitForm({
                index:index,
                url: suburl,
                param: $(top.frames[iframeId].document).find("form").formSerialize(),
                success: function () {
                    $("#" + table).trigger("reloadGrid");
                }
            })
        }
    });
}
//修改方法
//table:表格id
//id:编号
//title:标题
//url:地址
//formurl:表单加载的地址
//width:宽
//height:高
function btn_edit(table, id, title, url, formurl,suburl, width, height) {
    var keyValue = $("#" + table).jqGridRowValue().F_Id;
    if (keyValue == null || keyValue == "") {
        top.layer.alert("请选择一行数据", {
            icon: "fa-exclamation-circle",
            title: "系统提示",
            btn: ['确认'],
            btnclass: ['btn btn-primary'],
        });
        return false;
    }
    var submiturl = suburl + '?keyValue=' + keyValue;
    $.modalOpenEdit({
        id: id,
        title: title,
        url: url,
        width: width + "px",
        height: height + "px",
        LoadForm: function (iframeId, index) {
            $.ajax({
                url: formurl + '?keyValue=' + keyValue,
                data: { keyValue: keyValue },
                dataType: "json",
                async: false,
                success: function (data) {
                    top.frames[iframeId].LoadForm(data);
                }
            });
        },
        callBack: function (iframeId, index) {
            if (!formValid($(top.frames[iframeId].document).find('form'))) {
                return false;
            }
            $.submitForm({
                index: index,
                url: submiturl,
                param: $(top.frames[iframeId].document).find("form").formSerialize(),
                success: function () {
                    $("#" + table).resetSelection();
                    $("#" + table).trigger("reloadGrid");
                }
            })
        }
    });
}
//删除方法
//table:表格id
//url：地址
function btn_delete(table, url) {
    var keyValue = $("#" + table).jqGridRowValue().F_Id;
    if (keyValue == null || keyValue == "") {
        top.layer.alert("请选择一行数据", {
            icon: "fa-exclamation-circle",
            title: "系统提示",
            btn: ['确认'],
            btnclass: ['btn btn-primary'],
        });
        return false;
    }
    $.deleteForm({
        url: url,
        param: { keyValue: $("#" + table).jqGridRowValue().F_Id },
        success: function () {
            $("#" + table).resetSelection();
            $("#" + table).trigger("reloadGrid");
        }
    })
}
//提交方法
function btn_confirm(table,url,msg) {
    var keyValue = $("#" + table).jqGridRowValue().F_Id;
    if (keyValue == null || keyValue == "") {
        top.layer.alert("请选择一行数据", {
            icon: "fa-exclamation-circle",
            title: "系统提示",
            btn: ['确认'],
            btnclass: ['btn btn-primary'],
        });
        return false;
    }
    $.modalConfirm(msg, function (r) {
        if (r) {
            $.submitForm({
                url: url,
                param: { keyValue: keyValue },
                success: function () {
                    $("#" + table).trigger("reloadGrid");
                }
            })
        }
    });
}
//详细查看
function btn_details(table, id, title, url, formurl, width, height) {
    var keyValue = $("#" + table).jqGridRowValue().F_Id;
    if (keyValue == null || keyValue == "") {
        top.layer.alert("请选择一行数据", {
            icon: "fa-exclamation-circle",
            title: "系统提示",
            btn: ['确认'],
            btnclass: ['btn btn-primary'],
        });
        return false;
    }
    $.modalOpenEdit({
        id: id,
        title: title,
        url: url + '?keyValue=' + keyValue,
        width: width + "px",
        height: height + "px",
        btn: null,
        LoadForm: function (iframeId, e) {
            $.ajax({
                url: formurl + '?keyValue=' + keyValue,
                data: { keyValue: keyValue },
                dataType: "json",
                async: false,
                success: function (data) {
                    top.frames[iframeId].LoadForm(data);
                    $(top.frames[iframeId].document).find("#form1").find('.form-control,input,textarea').attr('readonly', 'readonly');
                    $(top.frames[iframeId].document).find("#form1").find('select').attr('disabled', 'disabled');
                    $(top.frames[iframeId].document).find('div.ckbox label').attr('for', '');
                }
            });
        }
    });
}

//普通的打开指定窗口
function btn_open(table, id, title, url, width, height,one) {
    var keyValue = $("#gridList").jqGridRowValue().F_Id;
    if (one=="true") {
        if (keyValue == null || keyValue == "") {
            top.layer.alert("请选择一行数据", {
                icon: "fa-exclamation-circle",
                title: "系统提示",
                btn: ['确认'],
                btnclass: ['btn btn-primary'],
            });
            return false;
        }
    }
    $.modalOpen({
        id: id,
        title: title,
        url:  url + "?parentId=" + keyValue,
        width: width + "px",
        height: height + "px",
        btn: null,
    });
}