<?php
require_once ("../core/config.inc.php");


$sql = "SELECT * FROM  `deayou_account_log` WHERE remark LIKE  '%20121100022%' and type='repay_interest_service'";
$result = $mysql->db_fetch_arrays($sql);

foreach ($result as $key => $value){
    
        $sql = "update `deayou_account_log` set user_id=0 where id='{$value['id']}'";
        $mysql->db_query($sql);
        if ($value['user_id']>0){
    	//�û��Խ���Ļ���
        	
            
            $log_info["nid"] = $value['nid'];//�����û�id
			$log_info["id"] = $value['id'];//�����û�id
			$log_info["user_id"] = $value['user_id'];//�����û�id
			$log_info["money"] = $value['money'];//�������
			$log_info["income"] = 0;//����
			$log_info["expend"] = $value['money'];//֧��
			$log_info["balance_cash"] = -$value['money'];//�����ֽ��
			$log_info["balance_frost"] = 0;//�������ֽ��
			$log_info["frost"] = 0;//������
			$log_info["await"] = 0;//���ս��
            
            
            
            AddLog($log_info);
          
            
        $mysql->db_query($sql);
        
		//��������������վ���ܷ���
		$sql = "select * from `{account_balance}` where `nid` = '{$value['nid']}'";
		$result = $mysql -> db_fetch_array($sql);
		if ($result==false){
			//������վ�Ĳ����
			$sql = "delete from `{account_balance}` where nid='{$value['nid']}'";
           // var_dump($sql);
           $mysql->db_query($sql);
		}
		
		//�������������û����ܷ���
		$sql = "select * from `{account_users}` where `nid` = '{$value['nid']}'";
		$result = $mysql -> db_fetch_array($sql);
		if ($result==false){
			
			$sql = "delete from `{account_users}` where nid='{$value['nid']}'";
           // var_dump($sql);
			$mysql->db_query($sql);
		}
        }
        
}

	/**
	 * ��ֵ���
	 *
	 * @param Array $data =array("nid"=>"������","verify_remark"=>"��˱�ע","status"=>"���״̬")
	 * @return Boolen
	 */
	function AddLog($data = array()){
		global $mysql;
		
        
    		if ($data['await']!=0){
    		  $sql = "update `{account_log}` set await =await-{$data['await']},await_old =await_old-{$data['await']},await_new=await-await_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
             
              $mysql->db_query($sql);
    		}
            
            if ($data['frost']!=0){
    		  $sql = "update `{account_log}` set frost =frost-{$data['frost']},frost_old =frost_old-{$data['frost']},frost_new=frost-frost_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
              $mysql->db_query($sql);
    		}
            
            
            if ($data['balance_cash']!=0){
    		  $sql = "update `{account_log}` set balance_cash =balance_cash-{$data['balance_cash']},balance_cash_old =balance_cash_old-{$data['balance_cash']},balance_cash_new=balance_cash-balance_cash_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
              $mysql->db_query($sql);
              
              $sql = "update `{account_log}` set balance =balance-{$data['balance_cash']},balance_old =balance_old-{$data['balance_cash']},balance_new=balance-balance_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
              $mysql->db_query($sql);
    		}
            
             if ($data['balance_frost']!=0){
    		  $sql = "update `{account_log}` set balance_frost =balance_frost-{$data['balance_frost']},balance_frost_old =balance_frost_old-{$data['balance_frost']},balance_frost_new=balance_frost-balance_frost_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
              $mysql->db_query($sql);
              
               $sql = "update `{account_log}` set balance =balance-{$data['balance_frost']},balance_old =balance_old-{$data['balance_frost']},balance_new=balance-balance_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
              $mysql->db_query($sql);
    		}


            
            
             if ($data['income']!=0){
    		  $sql = "update `{account_log}` set income =income-{$data['income']},income_old =income_old-{$data['income']},income_new=income_new-income_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
              $mysql->db_query($sql);
              
    		}           
            
             if ($data['expend']!=0){
    		  $sql = "update `{account_log}` set expend =expend-{$data['expend']},expend_old =expend_old-{$data['expend']},expend_new=expend_new-expend_old  where id>{$data['id']} and user_id='{$data['user_id']}' ";
              $mysql->db_query($sql);
              }
    		    
            $sql = "update `{account_log}` set total=balance+frost+await ,total_old=balance_old+frost_old+await_old where id>{$data['id']} and user_id='{$data['user_id']}' ";
            $mysql->db_query($sql);
            
           	$sql = "select * from `{account_log}` where user_id='{$data['user_id']}' order by id desc";
    		$result = $mysql->db_fetch_array($sql);
    		
    		//���Ĳ��������û���
    		$sql = "update `{account}` set income={$result['income']},expend='{$result['expend']}',";
    		$sql .= "balance_cash={$result['balance_cash']},balance_frost={$result['balance_frost']},";
    		$sql .= "frost={$result['frost']},";
    		$sql .= "await={$result['await']},";
    		$sql .= "balance={$result['balance']},";
    		$sql .= "total={$result['total']}";
    		$sql .=" where user_id='{$data['user_id']}'";
           
	       $mysql->db_query($sql);
		
        
		
	}
echo ok;
?>