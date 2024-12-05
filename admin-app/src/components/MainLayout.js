import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import {
  AiOutlineDashboard,
  AiOutlineShoppingCart,
  AiOutlineUser,
  AiOutlineBgColors,
} from "react-icons/ai";
import { RiCouponLine } from "react-icons/ri";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useLocation } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { IoIosNotifications } from "react-icons/io";
import { FaClipboardList, FaBloggerB } from "react-icons/fa";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt } from "react-icons/bi";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const path = location.pathname.split("/")[2] || "";
    setSelectedKey(path);
  }, [location]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuItems = [
    {
      key: "",
      icon: <AiOutlineDashboard className="fs-4" />,
      label: "Giao diện quản trị",
    },
    {
      key: "customers",
      icon: <AiOutlineUser className="fs-4" />,
      label: "Quản lý người dùng",
    },
    {
      key: "list-product",
      icon: <AiOutlineShoppingCart className="fs-4" />,
      label: "Quản lý sản phẩm",
    },
    {
      key: "list-brand",
      icon: <SiBrandfolder className="fs-4" />,
      label: "Quản lý thương hiệu",
    },
    {
      key: "list-category",
      icon: <BiCategoryAlt className="fs-4" />,
      label: "Quản lý danh mục",
    },
    {
      key: "list-color",
      icon: <AiOutlineBgColors className="fs-4" />,
      label: "Quản lý màu sắc",
    },
    {
      key: "orders",
      icon: <FaClipboardList className="fs-4" />,
      label: "Quản lý đơn hàng",
    },
    {
      key: "coupon-list",
      icon: <RiCouponLine className="fs-4" />,
      label: "Quản lý mã giảm giá",
    },
    {
      key: "blog-list",
      icon: <FaBloggerB className="fs-4" />,
      label: "Quản lý bài viết",
    },
    {
      key: "blog-category-list",
      icon: <FaBloggerB className="fs-4" />,
      label: "Quản lý danh mục bài viết",
    },
    {
      key: "enquiries",
      icon: <FaClipboardList className="fs-4" />,
      label: "Quản lý khảo sát khách hàng",
    },
  ];

  const { user } = useSelector((state) => state.auth.user);

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-5 text-center py-3 mb-0">
            <span className="sm-logo">DP</span>
            <span className="lg-logo">Dev PTIT</span>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={({ key }) => {
            setSelectedKey(key);
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={menuItems}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="d-flex justify-content-between ps-1 pe-5"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
          <div className="d-flex gap-4 align-items-center">
            <div className="position-relative">
              <IoIosNotifications className="fs-4" />
              <span className="badge bg-warning rounded-circle p-1 position-absolute">
                3
              </span>
            </div>

            <div className="d-flex gap-3 align-items-center dropdown">
              <div>
                <img
                  width={32}
                  height={32}
                  src="https://stroyka-admin.html.themeforest.scompiler.ru/variants/ltr/images/customers/customer-4-64x64.jpg"
                  alt=""
                />
              </div>
              <div
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <h5 className="mb-0">{user.name}</h5>
                <p className="mb-0">{user.email}</p>
              </div>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item py-1 mb-1"
                    style={{ height: "auto", lineHeight: "20px" }}
                    to="/"
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <ToastContainer
            position="top-right"
            autoClose={250}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            theme="light"
          />
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
