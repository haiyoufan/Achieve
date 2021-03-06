﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AchieveCommon;
using AchieveCommon.Base;
using AchieveEntity;
using AchieveInterfaceDAL;
using SqlSugar;

namespace AchieveDAL
{
    public class Sys_ItemsDetailDAL : BaseDAL<Sys_ItemsDetail>, ISys_ItemsDetailDAL
    {
        /// <summary>
        /// 获取所有数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Sys_ItemsDetail> GetList(string id = "",string keyvalue="")
        {
            using (var db = SqlSugarDao.GetInstance())
            {
                List<Sys_ItemsDetail> list = null;
                var data = db.Queryable<Sys_ItemsDetail>();
                list = data.ToList();
                if (id != "" && id != null)
                {
                    list = data.Where(c => c.F_ItemId == id).ToList();
                }
                if (keyvalue != "" && keyvalue != null)
                {
                    list = data.Where(c => c.F_ItemName.Contains(keyvalue)||c.F_ItemCode.Contains(keyvalue)).ToList();
                }
                if (list.Count > 0)
                {
                    return list;
                }
                else
                {
                    return null;
                }
            }
        }

        /// <summary>
        /// 编码获取
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<Sys_ItemsDetail> GetItemList(string encode)
        {
            using (var db = SqlSugarDao.GetInstance())
            {
                var data = db.Queryable<Sys_ItemsDetail>().
                    JoinTable<Sys_Items>((s1, s2) => s1.F_ItemId == s2.F_Id).
                    Where("s2.F_EnCode = '" + encode + "'").Select("s1.*").ToList();
                if (data.Count > 0)
                {
                    return data;
                }
                else
                {
                    return null;
                }
            }
        }
    }
}
